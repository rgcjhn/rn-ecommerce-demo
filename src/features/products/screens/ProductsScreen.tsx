import React, { useLayoutEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { RootStackParamList } from "@/app/navigation/types";
import { addToCart } from "@/features/cart/store/cartSlice";
import { useAppDispatch } from "@/store/store";
import CartHeaderIcon from "@/shared/components/CartHeaderIcon";
import { StackScreenProps } from "@react-navigation/stack";
import { colors } from "@/shared/styles/colors";

import { useGetProductsQuery } from "../api/productsApi";
import { Product } from "../models/product.types";

type Props = StackScreenProps<RootStackParamList, "Products">;

const ProductsScreen: React.FC<Props> = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  const { data, isLoading, isFetching, error } = useGetProductsQuery({
    limit: itemsPerPage,
    skip: (page - 1) * itemsPerPage,
  });

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <CartHeaderIcon />,
      title: "Products",
    });
  }, [navigation]);

  const loadMore = () => {
    if (!isFetching && data && data.products.length < data.total) {
      setPage((prev) => prev + 1);
    }
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ProductDetails", { product: item })}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <View style={styles.cardInfo}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={(e) => {
            e.stopPropagation();
            dispatch(addToCart(item));
          }}
        >
          <Text style={styles.buttonText}>+ Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (isLoading && page === 1) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load products</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data?.products || []}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
      ListFooterComponent={
        isFetching ? <ActivityIndicator color={colors.primary} /> : null
      }
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: colors.surface,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.11,
    shadowRadius: 1.11,
    elevation: 2,
  },
  thumbnail: {
    width: "100%",
    height: 150,
    backgroundColor: colors.gray100,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  cardInfo: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  price: {
    fontSize: 12,
    color: colors.success,
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  buttonText: {
    color: colors.textLight,
    fontSize: 12,
    fontWeight: "600",
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
  },
});

export default ProductsScreen;
