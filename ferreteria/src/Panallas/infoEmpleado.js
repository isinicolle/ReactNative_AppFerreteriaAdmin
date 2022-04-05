import React,{ useState,useEffect } from 'react';

import { StyleSheet, ActivityIndicator, View, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Boton,HiperVinculo,TextBox,PasswordBox,Footer, Texts, Header} from '../componentes/'
const idcliente=7
let primera=true;
const clienteURL="http://192.168.100.48:6001/api/empleados/buscarEmpleado?id_empleado=";
const clienteActu="http://192.168.100.48:6001/api/empleados/actualizarEmpleados?id_empleado=";

const Empleado=({route}) => {
    console.log(route);
    const [nombre,setNombre]=useState(null);
    const [apellido,setApellido]=useState(null);
    const [telefono,setTelefono]=useState(null);
    const[direccion,setDireccion]=useState(null);

    
    useEffect(()=>{
      
        cargar();
        
    },[]
    )
    const cargar= async() => {
       
            fetch(clienteURL+route.params.idEmp).then((response)=> response.json())
            .then((json)=>{
                setNombre(json.nom_empleado);
                setApellido(json.apellido_empleado);
                setTelefono(json.telefono_empleado);
                setDireccion(json.direccion_empleado);
               
            })
            .catch((error)=>console.log(error))
        
    }
    const presGuardarCambio= async() => {
      try {
          const respuesta = await fetch(
           clienteActu+route.params.idEmp,{
               method: 'PUT',
               headers:{
                   Accept: 'application/json',
                   'Content-Type': 'application/json'},
                body: JSON.stringify({
                    nom_empleado: nombre,
                    apellido_empleado: apellido,
                    telefono_empleado: telefono,
                    direccion_empleado: direccion,
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
            <Header busqueda={false} text={"Informacion de empleado"} icon={'chevron-left'}></Header>
        <View style={styles.tarjeta}>
        <Texts text='Nombre'/>
        <TextBox text={'Andres'} setValue={setNombre} value={nombre} icon={'face'} />
        <Texts text={'Apellido'}/>
        <TextBox text={'Martinez'} setValue={setApellido} value={apellido} icon={'face'} />
        <Texts text={'Telefono'}/>
        <TextBox text={'95560237'} setValue={setTelefono} value={telefono} icon={'phone'} tipo={"number-pad"} max={12}/>
        <Texts text={'Dirección'}/>
        <TextBox text={'Col. Felipe Zelaya'} setValue={setDireccion} value={direccion} icon={'book'}/>
            <Boton text={'Editar información'} onPress={cargar} />
            <Boton text={'Guardar Cambios'} onPress={presGuardarCambio}/>
    </View>
    <Footer/>
  </View>
               
  </ScrollView>

    );
};

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
    contenedorApp: {
        alignItems: "stretch",
        justifyContent: 'center',
        height: "100%",
        width: 360,
        minHeight: 600,
        borderWidth: 1,
        borderColor: "#dedede",
        borderRadius: 25,
    },
    contenedorTitulo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 15,
        backgroundColor: "#fff"

    },
    tituloConfiguraciones: {

        color: "#110000",
        fontSize: 18,
        fontWeight: "500",

    },
    tituloEntradas: {
        color: "#110000",
        fontSize: 17,
        fontWeight: "500",

    },
    contenedorControles: {
        flex: 9,
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: "#dedede",
        borderRadius: 25,
    },
    entradas: {
        flex: 5,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",

    },
    individualEntras: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 5
    },
    botones: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#C70039',
        margin: 5
    },
    text: {
        fontSize: 13,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },


    footer: {
        flex: 3,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 10,
    },
    textoFooter: {
        color: 'rgb( 194, 192, 192)',
        fontSize: 10,
        fontWeight: "200",
        opacity: 20,
        padding: 10
    },
    tarjeta:{
        flex:1,
        padding:10,
        backgroundColor: '#fff',
        shadowColor: "#C70039",
        shadowOffset: 
          {
            width: 0,
            height: 13,
          },
        
        shadowOpacity: 0.44,
        shadowRadius: 28,
        elevation: 16,
        width:'90%',
        flexGrow:1,
        borderRadius:20,
        maxWidth:500,
        marginTop:20
        }

});
export default Empleado;
