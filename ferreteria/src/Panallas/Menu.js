import * as React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Pantallas
import { Login,crearempleado,PaginaBusqueda,Usuario,PaginaProductos,Inicio,Producto,PantallaProd,Empleado,Config,PantallaAgregarP,OlvidarContra} from './index';

const Stack = createNativeStackNavigator();
export default function Menu() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="actualizarEmpleado" component={PantallaProd}/>
        <Stack.Screen name="agregarEmpleado" component={crearempleado}/>
        <Stack.Screen name="Usuario" component={Usuario}/>
        <Stack.Screen name='PantallaProd' component={PantallaProd}/>
        <Stack.Screen name='AgregarProd' component={PantallaAgregarP}/>
        <Stack.Screen name="Busqueda" component={PaginaBusqueda} />
        <Stack.Screen name="Productos" component={PaginaProductos} />
        <Stack.Screen name="Producto" component={Producto} />
        <Stack.Screen name="Empleado" component={Empleado} />
        <Stack.Screen name="Config" component={Config} />
        <Stack.Screen name="OlvidarContra" component={OlvidarContra} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}