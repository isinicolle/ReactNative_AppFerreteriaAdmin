import * as React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Pantallas
import { Login,crearempleado,PaginaBusqueda,PaginaProductos,Inicio,Producto} from './index';

const Stack = createNativeStackNavigator();
export default function Menu() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Busqueda" component={PaginaBusqueda} />
        <Stack.Screen name="Productos" component={PaginaProductos} />
        <Stack.Screen name="Producto" component={Producto} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}