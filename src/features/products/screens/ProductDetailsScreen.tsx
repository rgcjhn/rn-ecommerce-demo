// src/features/products/screens/ProductDetailScreen.tsx
import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/navigation/types";
import { useAppDispatch } from "@/store/store";
import { addToCart } from "@/features/cart/store/cartSlice";
import { colors } from "@/shared/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import CartHeaderIcon from "@/shared/components/CartHeaderIcon";

type Props = StackScreenProps<RootStackParamList, "ProductDetails">;

const ProductDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { product } = route.params;

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <CartHeaderIcon />,
      title: product.title.substring(0, 20) + "...",
    });
  }, [navigation, product.title]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const calculateDiscountedPrice = () => {
    if (product.discountPercentage) {
      const discounted =
        product.price - (product.price * product.discountPercentage) / 100;
      return discounted.toFixed(2);
    }
    return product.price.toFixed(2);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Rating Badge */}
        {product.rating && (
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={16} color={colors.warning} />
            <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
          </View>
        )}
      </View>

      {/* Product Info */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>{product.title}</Text>

        {/* Brand and Category */}
        <View style={styles.metaContainer}>
          {product.brand && (
            <View style={styles.metaItem}>
              <Ionicons
                name="business-outline"
                size={16}
                color={colors.textSecondary}
              />
              <Text style={styles.metaText}>{product.brand}</Text>
            </View>
          )}
          {product.category && (
            <View style={styles.metaItem}>
              <Ionicons
                name="pricetag-outline"
                size={16}
                color={colors.textSecondary}
              />
              <Text style={styles.metaText}>{product.category}</Text>
            </View>
          )}
          {product.stock && (
            <View style={styles.metaItem}>
              <Ionicons
                name={
                  product.stock > 0
                    ? "checkmark-circle-outline"
                    : "close-circle-outline"
                }
                size={16}
                color={product.stock > 0 ? colors.success : colors.error}
              />
              <Text
                style={[
                  styles.metaText,
                  { color: product.stock > 0 ? colors.success : colors.error },
                ]}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </Text>
            </View>
          )}
        </View>

        {/* Price Section */}
        <View style={styles.priceContainer}>
          {product.discountPercentage > 0 ? (
            <>
              <Text style={styles.originalPrice}>
                ${product.price.toFixed(2)}
              </Text>
              <Text style={styles.discountedPrice}>
                ${calculateDiscountedPrice()}
              </Text>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>
                  -{product.discountPercentage}%
                </Text>
              </View>
            </>
          ) : (
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          )}
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={[
            styles.addButton,
            product.stock === 0 && styles.disabledButton,
          ]}
          onPress={handleAddToCart}
          disabled={product.stock === 0}
        >
          <Text style={styles.addButtonText}>
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    position: "relative",
    backgroundColor: colors.surface,
  },
  image: {
    width: "100%",
    height: 350,
  },
  ratingBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.black + "CC",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 4,
  },
  ratingText: {
    color: colors.textLight,
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  price: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.success,
  },
  originalPrice: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.textSecondary,
    textDecorationLine: "line-through",
  },
  discountedPrice: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.success,
  },
  discountBadge: {
    backgroundColor: colors.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    color: colors.textLight,
    fontSize: 14,
    fontWeight: "600",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 32,
  },
  disabledButton: {
    backgroundColor: colors.gray400,
  },
  addButtonText: {
    color: colors.textLight,
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ProductDetailsScreen;
