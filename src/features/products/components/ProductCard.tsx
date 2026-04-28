import React, { memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  GestureResponderEvent,
} from "react-native";
import { addToCart } from "@/features/cart/store/cartSlice";
import { useAppDispatch } from "@/store/store";
import { colors } from "@/shared/styles/colors";
import { Product } from "../models/product.types";

type ProductCardProps = {
  product: Product;
  onPress: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: GestureResponderEvent) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <View style={styles.cardInfo}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>+ Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
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
});

export default memo(ProductCard);
