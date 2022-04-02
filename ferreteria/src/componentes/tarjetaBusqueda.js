import React,{useState}from 'react'
import { Pressable,StyleSheet,Text,TouchableOpacity, View,TextInput,Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ScrollerNumero from './ScrollerNumero'
import Boton from './Boton'

const TarjetaBusqueda = ({item})=>{
    
    if (item.id_producto)
    return (

            <TouchableOpacity>
            <View style={styles.tarjeta}>
                <Image source = {{uri:((item.imagen.includes("http")? item.imagen :'http://192.168.100.48:6001/img/'+item.imagen ))}} style={styles.imagen}/>
                <View style={styles.descripciones}>
                <Text style={{marginVertical:10,fontSize:20,fontWeight:'bold'}}>{item.descripcion_producto}</Text>
                <Text>{item.Marcas.descripcion_marca}</Text>
                <Text>{item.Categorias.descripcion_categoria}</Text>
                </View>
                <View style={styles.precio}>
                <Text>Lps. {item.precio_actual}</Text>
                </View>

            </View>
            </TouchableOpacity>
  
    )
    if (item.id_empleado)
        return(
            <TouchableOpacity>
            <View style={styles.tarjeta}>
                <Icon name='person' size={150} style={styles.imagen}/>
                <View style={styles.descripciones}>
                <Text style={{marginVertical:10,fontSize:20,fontWeight:'bold'}}>{item.nom_empleado+' '+item.apellido_empleado}</Text>
                <Text>{item.telefono_empleado}</Text>
                <Text>{item.fnacimiento_empleado}</Text>
                </View>
                <View style={styles.precio}>
                <Text>{ item.Estado? 'Activo':'Inactivo' } </Text>
                </View>

            </View>
            </TouchableOpacity>
        )
};
const styles = StyleSheet.create({
    container:{
       width:'100%',
       backgroundColor:'#f8f8f8'
    },
    tarjeta:{
       flexDirection:'row',
       borderBottomColor:'gray',
       borderBottomWidth:1,
       marginHorizontal:10,
       paddingVertical:10,
       justifyContent:'space-between',
       backgroundColor:'white'
    },
    imagen:{
        width:150,
        height:150,
        maxHeight:'100%',
        maxWidth:'100%',
        resizeMode:'center',
        borderRadius:25,
        backgroundColor:'white',
        marginVertical:10
    },
    descripciones:{
     flex:1,
     flexDirection:'column',
     justifyContent:'flex-start',
     marginLeft:15
    },
    precio:{
      justifyContent:'flex-end',
      marginHorizontal:10
    },
})


export default TarjetaBusqueda
