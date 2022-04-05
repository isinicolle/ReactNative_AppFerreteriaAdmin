import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ScrollerNumero from "../componentes/ScrollerNumero";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Boton,
  HiperVinculo,
  TextBox,
  PasswordBox,
  Footer,
  Header,
  Texts,
} from "../componentes/";
const id = 21;
let primera = true;
const productoURL =
  "http://192.168.100.48:6001/api/productos/buscarProducto?id_producto=";
const productoActuURL =
  "http://192.168.100.48:6001/api/productos/modificarProducto?id_producto=";
const productoElimURL =
  "http://192.168.100.48:6001/api/productos/eliminarProducto?id_producto=";

const Pantalla = ({route}) => {
  console.log(route)
    const cantidadProp=0;
    const [user,setUser]= useState();
    const [cantidad,setCantidad]= useState(cantidadProp);
    const [costo,setCosto]=useState(null);
    const [precio,setPrecio]=useState(null);
    const [descripcion,setDescripcion]=useState(null);
    const [cantidadxunidad,setCantidadxUnidad]=useState(null);
    const [stock,setStock]=useState(null);
    const [descuento,setDescuento]=useState(null);
    const [estadoaqui,setEstadoAqui]=useState(null);
    const [imagen,setImagen]=useState(null);
    const [marca,setMarca]=useState(null);
    const [categoria,setCategoria]=useState(null);
    const [activoIn,setActivoIn]=useState(null);

   
   

  useEffect(() => {
    cargar();
  }, []);

  const cargar= async() => {
      
    await  fetch(productoURL+route.params.idProd).then((response)=> response.json())
      .then((json)=>{
          setDescripcion(json.descripcion_producto);
          setCantidadxUnidad(json.cantidad_por_unidad);
          setCosto(json.costo_producto+"");
          setPrecio(json.precio_actual+'');
          setStock(json.stock+"");
          setDescuento(json.descuento+"");
          setImagen(json.imagen);
          setCategoria(json.Categorias.descripcion_categoria);
          setMarca(json.Marcas.descripcion_marca);
          setEstadoAqui(json.estado);
          if(json.estado==true){
              setActivoIn('Habilitado')
          }
          else{
              setActivoIn('Deshabilitado')
          }
      })
      .catch((error)=>console.log(error))

}
    const presEditar= async() => {
        try {
            const respuesta = await fetch(
                productoActuURL+route.params.idProd,{
                 method: 'PUT',
                 headers:{
                     Accept: 'application/json',
                     'Content-Type': 'application/json'},
                  body: JSON.stringify({
                    descripcion_producto: descripcion,
                    costo_producto:Number(costo),
                    precio_actual:Number(precio),
                    stock:Number(stock),
                    descuento:Number(descuento)
                  })
              
                 } );
                 const json= await respuesta.json();
                 console.log(json);
                 Alert.alert("FERRETEAR","Datos editados correctamente");
                 cargar();
        } catch (error) {
            console.error(error);
        } 
      }
     
      const presEliminar= async() => {
        try {
            const respuesta = await fetch(
                productoElimURL+route.params.idProd,{
                 method: 'PUT',
                 headers:{
                     Accept: 'application/json',
                     'Content-Type': 'application/json'},
                  body: JSON.stringify({
                    estado: estadoaqui
                  })
              
                 } );
                 const json= await respuesta.json();
                 console.log(json);
                 Alert.alert("FERRETEAR","Datos editados correctamente");
                 cargar();
        } catch (error) {
            console.error(error);
        } 
      }
     
    return (
        
      <ScrollView>
      <View style={styles.container}>
          <Header  busqueda={true}  icon={'chevron-left'}></Header>
          {imagen && (
          <Image
            style={styles.logo}
            source={{
              uri: imagen.includes("http")
                ? imagen
                : "http://192.168.100.48:6001/img/" + imagen,
            }}
          />
        )}
         
          <View style={styles.tarjeta}>
          <Texts text={'Nombre Producto'}/>
          <TextBox text={'Producto'} setValue={setDescripcion} value={descripcion} icon={'text-format'} />
          <Texts text={'Costo Producto'}/>
          <TextBox text={'Costo'} setValue={setCosto} value={costo} icon={'text-format'} />
          <Texts text={'Precio'}/>
          <TextBox text={'Precio'} setValue={setPrecio} value={precio} icon={'text-format'} tipo={"decimal-pad"}/>
          <Texts text={'Stock'}/>
          <TextBox text={'Stock'} setValue={setStock} value={stock} icon={'text-format'} tipo={"decimal-pad"}/>
          <Texts text={'Descuento'}/>
          <TextBox text={'Descuento'} setValue={setDescuento} value={descuento} icon={'text-format'} tipo={"decimal-pad"}/>
          <Text style={styles.habi}>{activoIn}</Text>
          <Boton text={'Actualizar'} onPress={presEditar}/>
          <Boton text={'Cambiar Estado'} onPress={presEliminar}/>

       
          </View>
        
          <Footer></Footer>
      </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({

    habi: {
        fontSize:18,
       fontWeight:'700',
       textAlign:'center',
       marginVertical:4
    },

    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignContent: 'center',
        height: '100%'
    },

    logo: {
      width: 320,
      height: 250,
      resizeMode: 'contain',
      marginTop: "5%",
      marginBottom: "2%",
      padding: 10,
    },
  tarjeta: {
    flex: 3,
    padding: 10,
    backgroundColor: "#fff",

    shadowOffset: {
      width: 0,
      height: 5,
    },
    flexDirection: "column",
    shadowOpacity: 0.44,
    shadowRadius: 5,
    elevation: 16,
    width: "90%",
    flexGrow: 1,
    borderRadius: 20,
    maxWidth: 500,
    height: "100%",
    minHeight: 170,
    margin: 10,
  },
});
export default Pantalla;
