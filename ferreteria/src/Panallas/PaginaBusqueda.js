import React, { useState,useEffect } from 'react'
import { StatusBar,TouchableOpacity,TextInput, StyleSheet, Text, View,Image,SafeAreaView,ScrollView, FlatList,Keyboard} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'
import { Boton, HiperVinculo, TextBox, PasswordBox, Footer, Header, ListaProducto, TarjetaProducto,TarjetaBusqueda } from '../componentes'
import { useNavigation,useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PaginaBusqueda = ({route,navigation})=> {
    //Use state
    const isFocused = useIsFocused();
    const nav=useNavigation();
    const[rol,setRol]=useState('');
    const[busqueda,setBusqueda]=useState('');
    const[listas,setListas] = useState('');
    const[listaMaestra,setListaMaestra]=useState('');
    const[buscando,setBuscando]=useState(false);
    //Funciones
    useEffect( ()=>{
        if(isFocused)
        {
            getAsync();}
            fetchData()
           
    },
    [isFocused,route])
    useEffect( ()=>{
        handleBusqueda()   
    },
    [busqueda])
    const getAsync=async()=>{
        await AsyncStorage.getItem('idRol').then((data)=>{
            setRol(data);
            console.log(data);
        })
    }


    const fetchData = async()=>{
        
        switch(route.params.toLowerCase())
        {
            case "productos" : 
            {
                try{
                    const res = await fetch('http://192.168.100.48:6001/api/productos/listarProducto',
                    {method:'GET',
                    headers:{
                      Accept:'application/json',
                      'Content-Type':'application/json'
                    },
                  }
                  )
                  const json = await res.json().then((data)=>{setListas(data);setListaMaestra(data)});
                return (json);
            
                } catch(err){
                    console.log(err)
                }

                        
                break;
            }
            case "empleados":
            {
                    try{
                        const res = await fetch('http://192.168.100.48:6001/api/empleados/listarEmpleados',
                        {method:'GET',
                        headers:{
                          Accept:'application/json',
                          'Content-Type':'application/json'
                        },
                      }
                      )
                      const json = await res.json().then((data)=>{setListas(data);setListaMaestra(data)});
                    return (json);
                
                    } catch(err){
                        console.log(err)
                    }
                    break;
            }
        }
            
        }
       
     const handleBusqueda=()=>{
        if(busqueda){

            switch(route.params.toLowerCase()){
                case 'productos':
                    {
                        if (Number.isInteger(Number(busqueda)))
                        {
                            setListas(listaMaestra.filter((item)=>{return item.id_producto==Number(busqueda);})) 
                        }
                        else
                        {
                            setListas(listaMaestra.filter((item)=>{return item.descripcion_producto.toLowerCase().includes(busqueda.toLowerCase())})) 
                        }
                    }
                break;
                case 'empleados':{
                    if (Number.isInteger(Number(busqueda)))
                    {
                        setListas(listaMaestra.filter((item)=>{return item.id_empleado==Number(busqueda);})) 
                    }
                    else
                    {
                        setListas(listaMaestra.filter((item)=>{return (item.nom_empleado+item.apellido_empleado).toLowerCase().includes(busqueda.toLowerCase())})) 
                    }
                }
                break;
            }
            if (route.params=="Productos")
            {
               
            }


        }
        else
        setListas(listaMaestra);
     }

     const handleAdd = ()=>{
        console.log(route);
        switch(route.params.toLowerCase())
        {
            case 'productos':{
                console.log(route);
                nav.push('AgregarProd');
            }
            break;
            case 'empleados':{
                nav.push('agregarEmpleado');

            }
            break
        }


     } 
    //Renders
     const renderLista=(item)=>{
        return( 
            <TarjetaBusqueda item={item.item} />
        )
     }

     const renderVacio= ()=>{
        
        return(
             <View>
                 <Text>No se encontró el producto. Intente de nuevo y verifique los datos</Text>
             </View>
        )
     }
   
    return (
        
        <SafeAreaView >
        <View style={styles.container}>
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={()=> navigation.pop()} style={styles.btnHeader}>
                        <Icon name={'chevron-left'} color={'white'} size={50}/>
            </TouchableOpacity>
            <View style={styles.containerBusqueda}>
                    <TextInput onFocus={()=>{setBuscando(true)}} onBlur={()=>{setBuscando(false)}}  returnKeyType='search'  defaultValue={busqueda} onChangeText={setBusqueda}  placeholder='Buscar producto' style={{flex:1}}/>
                    
            </View>
           { buscando &&  
            <View style={{flex:5}}>
                <Boton padding={0} text={'Cancelar'} onPress={()=>{setBusqueda('');Keyboard.dismiss() }}/>
            </View> }
            {(rol==3) &&  <TouchableOpacity onPress={()=>{handleAdd()}}>
                <Icon name="add-box"  color={'white'} size={50}/>
            </TouchableOpacity>}
           
        </View>
            
            <FlatList style={{width:'100%'}} ListEmptyComponent={renderVacio} data={listas} keyExtractor={item=>item.id_producto} ListFooterComponent={()=>{return( <Footer/>   )}} renderItem={renderLista}/>
            
               
        </View>
        </SafeAreaView> 
        
    )
  
  }

  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F8F8F8',
      alignItems:'center',
      flexDirection:'column',
      alignContent:'center',
      height:'100%'
    },
    headerContainer:{
       
        maxHeight:150,
        flexDirection:'row',
        paddingVertical:'3%',
        alignItems:'center',
        width:'100%',
        backgroundColor:'#C70039'
    },
    btnHeader:{
        flex:2,
        marginHorizontal:5,
        borderRadius:20,
        maxWidth:50,
        marginVertical:'auto'
    },
    containerBusqueda:{
        flex:8,
        padding:10,
        borderWidth:1,
        borderColor:"#B9B9B9",
        backgroundColor:'#F2F2F2',
        borderRadius:50,
        alignItems:'center',
        flexDirection:'row',
        marginHorizontal:5,
    },
});
export default PaginaBusqueda;