import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types";

import ProductsScreen from "@/features/products/screens/ProductsScreen";
import CartScreen from "@/features/cart/screens/CartScreen";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}
