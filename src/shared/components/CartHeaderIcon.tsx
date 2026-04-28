import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "@/app/navigation/types";
import { useAppSelector } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const CartHeaderIcon: React.FC = () => {
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Cart")}
    >
      <Ionicons name="cart-outline" size={24} color="#007AFF" />
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{totalQuantity}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginRight: 16,
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -8,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default CartHeaderIcon;
