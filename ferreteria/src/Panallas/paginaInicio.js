import React from 'react'
import { StatusBar,TouchableOpacity,TextInput, StyleSheet, Text, View,Image,SafeAreaView,ScrollView} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'
import { IconButton,Boton, HiperVinculo, TextBox, PasswordBox, Footer, Header, ListaProducto, TarjetaProducto } from '../componentes/'

const PantallaInicio = ({route,navigation})=> {
    
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <Header busqueda={false} carrito={false} icon={'menu'} text={'Inicio'}/>
                    <View style={styles.containerBoton}>    
                    <IconButton icon={'tools'} textColor={'black'} color={'white'} iconColor={'black'}   text={'Productos'}  /> 
                    <IconButton icon={'user'} textColor={'black'} color={'white'} iconColor={'black'} text={'Usuario'}  /> 
                    <IconButton icon={'users'} textColor={'black'} color={'white'} iconColor={'black'} text={'Empleados'}  /> 
                    <IconButton icon={'user-plus'} textColor={'black'} color={'white'} iconColor={'black'} text={'Crear Empleado'}  /> 
                    <IconButton icon={'cog'} textColor={'black'} color={'white'} iconColor={'black'} text={'Configuracion'}  /> 
                    </View>  
                <Footer/>
            </SafeAreaView> 
        </ScrollView>
    );
  }

  
  const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#F8F8F8',
      alignItems:'center',
      flexDirection:'column',
      flexWrap:'wrap',
      alignContent:'center',
      height:'100%'
    },
    accesoRapido:{
        marginTop:'5%',
        padding:10,
        borderWidth:1,
        borderColor:"#B9B9B9",
        backgroundColor:'#F2F2F2',
        borderRadius:50,
        alignItems:'center',
        flex:1,
        marginHorizontal:5,
        
    },
    containerBoton:{
        flex:1,
        flexWrap:'wrap',
        flexDirection:'row',
        alignItems:'center',
        alignContent:'center',
        justifyContent:'center',
        marginVertical:20
    }
});
export default PantallaInicio;