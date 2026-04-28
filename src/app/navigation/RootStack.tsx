import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types";

import ProductsScreen from "@/features/products/screens/ProductsScreen";
import CartScreen from "@/features/cart/screens/CartScreen";
import ProductDetailsScreen from "@/features/products/screens/ProductDetailsScreen";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />

      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}
