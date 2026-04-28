import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "@/app/navigation/types";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { removeFromCart, updateQuantity, clearCart } from "../store/cartSlice";
import { colors } from "@/shared/styles/colors";

import { CartItem } from "../models/cart.types";
import { getDisplayPrice, truncateToDecimals } from "../utils/cartUtils";

type Props = NativeStackScreenProps<RootStackParamList, "Cart">;

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { items, totalPrice, totalDiscountedPrice, totalQuantity } =
    useAppSelector((state) => state.cart);

  const handleCheckout = () => {
    Alert.alert(
      "Checkout",
      `Total: $${totalPrice.toFixed(2)}\nProceed to checkout?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => dispatch(clearCart()) },
      ],
    );
  };

  const renderCartItem = ({ item }: { item: CartItem }) => {
    const discountedPrice = getDisplayPrice(item);
    const hasDiscount = item.discountPercentage > 0;

    return (
      <TouchableOpacity
        style={styles.cartItem}
        onPress={() => navigation.navigate("ProductDetails", { product: item })}
      >
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.priceContainer}>
            {hasDiscount ? (
              <>
                <Text style={styles.originalPrice}>
                  ${item.price.toFixed(2)}
                </Text>
                <Text style={styles.itemPrice}>${discountedPrice}</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    -{item.discountPercentage}%
                  </Text>
                </View>
              </>
            ) : (
              <Text style={styles.itemPrice}>${discountedPrice}</Text>
            )}
          </View>
        </View>

        <View style={styles.itemActions}>
          {/* Quantity controls */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() =>
                dispatch(
                  updateQuantity({ id: item.id, quantity: item.quantity - 1 }),
                )
              }
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.quantity}>{item.quantity}</Text>

            <TouchableOpacity
              onPress={() =>
                dispatch(
                  updateQuantity({ id: item.id, quantity: item.quantity + 1 }),
                )
              }
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Remove button */}
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              dispatch(removeFromCart(item.id));
            }}
            style={styles.removeButton}
          >
            <Ionicons name="trash-outline" size={20} color={colors.error} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={80} color={colors.gray400} />
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <TouchableOpacity
          style={styles.shopButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.shopButtonText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Items:</Text>
          <Text style={styles.totalValue}>{totalQuantity}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Price:</Text>
          <Text style={styles.totalPrice}>
            ${truncateToDecimals(totalDiscountedPrice)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => dispatch(clearCart())}
        >
          <Text style={styles.clearButtonText}>Clear Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray100,
  },
  list: {
    padding: 16,
  },
  cartItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: colors.gray100,
  },
  itemInfo: {
    flex: 2,
    marginRight: 8,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.success,
  },
  originalPrice: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.textSecondary,
    textDecorationLine: "line-through",
  },
  discountBadge: {
    backgroundColor: colors.error,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: colors.textLight,
    fontSize: 10,
    fontWeight: "600",
  },
  itemActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gray100,
    borderRadius: 8,
    overflow: "hidden",
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primary,
  },
  quantity: {
    minWidth: 28,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    color: colors.textPrimary,
  },
  removeButton: {
    padding: 6,
  },
  footer: {
    backgroundColor: colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textPrimary,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.success,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  checkoutButtonText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: "600",
  },
  clearButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  clearButtonText: {
    color: colors.error,
    fontSize: 15,
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray100,
  },
  emptyText: {
    fontSize: 18,
    color: colors.textSecondary,
    marginTop: 16,
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  shopButtonText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CartScreen;
