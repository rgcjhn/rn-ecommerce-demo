import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { RootStackParamList } from "@/app/navigation/types";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { StackScreenProps } from "@react-navigation/stack";
import { colors } from "@/shared/styles/colors";
import { useIsOnline } from "@/shared/hooks/useIsOnline";
import CartHeaderIcon from "@/shared/components/CartHeaderIcon";
import { useGetProductsQuery } from "../api/productsApi";
import { cacheProducts } from "../store/productsSlice";
import ProductCard from "../components/ProductCard";
import OfflineBanner from "../components/OfflineBanner";
import ErrorBanner from "../components/ErrorBanner";

type Props = StackScreenProps<RootStackParamList, "Products">;

const ProductsScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const isOnline = useIsOnline();

  // Get cached products from persisted slice
  const {
    byId,
    allIds,
    total: cachedTotal,
  } = useAppSelector((state) => state.products);

  const cachedProducts = allIds.map((id) => byId[id]).filter(Boolean);
  const hasCachedData = cachedProducts.length > 0;

  // RTK Query fetch
  const { data, isLoading, isFetching, error, refetch } = useGetProductsQuery(
    {
      limit: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
    },
    {
      refetchOnReconnect: false,
      refetchOnFocus: false,
      skip: !isOnline && hasCachedData && page === 1,
    },
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <CartHeaderIcon />,
      title: "Products",
    });
  }, [navigation]);

  // Cache RTK Query results to persisted slice
  useEffect(() => {
    if (data && data.products) {
      const append = page > 1;
      dispatch(
        cacheProducts({
          products: data.products,
          total: data.total,
          append,
        }),
      );
    }
  }, [data, page, dispatch]);

  const loadMore = () => {
    if (!isFetching && data && cachedProducts.length < cachedTotal) {
      setPage((prev) => prev + 1);
    }
  };

  const handleRetry = () => {
    if (isOnline) {
      refetch();
      setPage(1);
    }
  };

  // Determine what to display
  const displayProducts = data?.products || cachedProducts;
  const displayTotal = data?.total || cachedTotal;
  const showLoading = isLoading && page === 1 && !hasCachedData;
  const showOffline = !isOnline && hasCachedData;
  const showError = error && !hasCachedData;

  // Loading state (no cache)
  if (showLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  // Error state (no cache)
  if (showError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          {!isOnline ? "No internet connection" : "Failed to load products"}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      {showOffline && (
        <OfflineBanner
          isOnline={isOnline}
          onRefresh={handleRetry}
          showRefresh={isOnline && hasCachedData}
        />
      )}
      {error && hasCachedData && isOnline && (
        <ErrorBanner onRetry={handleRetry} />
      )}
      <FlatList
        data={displayProducts}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate("ProductDetails", { product: item })
            }
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          isFetching && page > 1 ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator color={colors.primary} />
              <Text style={styles.loadingMoreText}>Loading more...</Text>
            </View>
          ) : displayProducts.length >= displayTotal &&
            displayProducts.length > 0 ? (
            <Text style={styles.endText}>No more products</Text>
          ) : null
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 20,
  },
  list: {
    padding: 16,
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 16,
  },
  retryButtonText: {
    color: colors.textLight,
    fontSize: 14,
    fontWeight: "600",
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
  },
  loadingMoreText: {
    marginTop: 8,
    color: colors.textSecondary,
    fontSize: 12,
  },
  endText: {
    textAlign: "center",
    paddingVertical: 20,
    color: colors.textSecondary,
    fontSize: 12,
  },
  loadingText: {
    marginTop: 12,
    color: colors.textSecondary,
    fontSize: 14,
  },
});

export default ProductsScreen;
