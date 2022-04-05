import React from 'react'
import { StatusBar,TouchableOpacity,TextInput, StyleSheet, Text, View,Image,SafeAreaView,ScrollView} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'
import { IconButton,Boton, HiperVinculo, TextBox, PasswordBox, Footer, Header, ListaProducto, TarjetaProducto } from '../componentes/'
import AsyncStorage from '@react-native-async-storage/async-storage';
import react, { useEffect, useState } from 'react';
import { useNavigation,useIsFocused } from '@react-navigation/native';
const PantallaInicio = ({route,navigation})=> {
    const[rol,setRol]=useState('')
    useEffect(async()=>{
            await AsyncStorage.getItem('idRol').then((data)=>{
                setRol(data);
                console.log(data);
            })
    },[ ])
   
    return (
        
        <ScrollView>
           
             <SafeAreaView style={styles.container}>
             <Header busqueda={false} carrito={false} icon={'menu'} text={'Inicio'}/>
                 <View style={styles.containerBoton}>    
                 <IconButton onPress={()=>{navigation.navigate('Productos')}} icon={'tools'} textColor={'black'} color={'white'} iconColor={'black'}   text={'Productos'}  /> 
                 <IconButton icon={'user'} onPress={()=>{navigation.navigate('Usuario')}} textColor={'black'} color={'white'} iconColor={'black'} text={'Usuario'}  /> 
                 <IconButton icon={'users'}  onPress={()=>{navigation.navigate('Busqueda','empleados')}} textColor={'black'} color={'white'} iconColor={'black'} text={'Empleados'}  /> 
                 {(rol==3) && <IconButton icon={'user-plus'} onPress={()=>{navigation.push('agregarEmpleado')}} textColor={'black'} color={'white'} iconColor={'black'} text={'Crear Empleado'}  />  }
                 <IconButton icon={'cog'}  onPress={()=>{navigation.push('Config')}} textColor={'black'} color={'white'} iconColor={'black'} text={'Configuracion'}  /> 
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