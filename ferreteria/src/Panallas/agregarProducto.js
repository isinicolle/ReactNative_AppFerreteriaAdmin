import React from 'react';
import { useState,useEffect  } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, StyleSheet, Text, View, Image, SafeAreaView,Pressable, ScrollView , Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScrollerNumero from '../componentes/ScrollerNumero';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

import { Boton, HiperVinculo, TextBox, PasswordBox, Footer, Header, Texts,Pickers} from '../componentes/'

const productoFoto="http://192.168.1.8:6001/api/imagen/?id=";


const PantallaAgregarP = () => {
    const [selectedMarca,setSelectedMarca]= useState('');
    const [marca,setMarca] = useState('');
    const [selectedCategoria,setSelectedCategoria]= useState('');
    const [categoria,setCategoria] = useState('');
    const [selectedProveedores,setSelectedProveedores]= useState('');
    const [proveedores,setProveedores] = useState('');
    const [descripcion,setDescripcion]=useState(null);
    
    const [selectedImage, setSelectedImage] = React.useState(null);

    useEffect(()=>{
        console.log('hola');
          fetchMarca();
          fetchCategoria();
          fetchProveedores();
      },[])

    //----------------------Marca-----------------------------------------
      const fetchMarca= async ()=>{
        try
        {
          const res = await fetch('http://192.168.1.8:6001/api/marca/listarMarcas',
            {method:'GET',
              headers:{
              Accept:'application/json',
              'Content-Type':'application/json'
              }
            }
          );
         
          await res.json().then((data)=>{setMarca(data);setSelectedMarca(data[0])})
          console.log(marca);
         
       
        }
        catch(err){
          console.log(err);
        }
      
    }

    //------------------------Categoria---------------------------------------

           const fetchCategoria= async ()=>{
        try
        {
          const res = await fetch('http://192.168.1.8:6001/api/categoria/listarCategoria',
            {method:'GET',
              headers:{
              Accept:'application/json',
              'Content-Type':'application/json'
              }
            }
          );
          
          await res.json().then((data)=>{setCategoria(data);setSelectedCategoria(data[0])})
         
        
        }
        catch(err){
          console.log(err);
        }
      
    }

    //--------------------------------Proveedores-------------------------------------------

    const fetchProveedores= async ()=>{
        try
        {
          const res = await fetch('http://192.168.1.8:6001/api/proveedores/listar',
            {method:'GET',
              headers:{
              Accept:'application/json',
              'Content-Type':'application/json'
              }
            }
          );
          await res.json().then((data)=>{setProveedores(data);setSelectedProveedores(data[0])})
        
        }
        catch(err){
          console.log(err);
        }
      
    }
    
   
   //--------------funcion y pantalla de fotos---------------------------------------------
    const editarFoto= async() => {
        
    const fotoData = new FormData();

    fotoData.append('img', {
        uri: selectedImage.localUri,
        name: 'imagen',
        type: 'image/jpg'
    }
    )
        try {
            const respuesta = await fetch(
                productoFoto+15,{
                 method: 'POST',
                 headers:{
                     Accept: 'multipart/form-data',
                     'Content-Type': 'multipart/form-data'},
                  body: fotoData
                 } );
                 const json= await respuesta.json();
                 console.log(json);
                 Alert.alert("FERRETEAR","Datos editados correctamente");
        } catch (error) {
            console.error(error);
        } 
      }

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);
        if (pickerResult.cancelled === true) {
            return;
          }
          setSelectedImage({ localUri: pickerResult.uri });
        };
       
//---------------------------------------si hay imagen-----------------------------------------------
        if (selectedImage !== null) {
          return (
            <ScrollView>
        <View style={styles.container}>
            <Header  busqueda={true}  icon={'chevron-left'}></Header>
           
            <View style={styles.tarjeta}>
                <Text style={styles.infoProducto}>NUEVO PRODUCTO</Text>
            <Image source={{ uri: selectedImage.localUri }} style={styles.logo} />
      
        <Boton onPress={openImagePickerAsync} text={'Pick a photo'}> </Boton>
        <Texts text={'Nombre Producto'}/>
            <TextBox text={'Producto'} setValue={setDescripcion} value={descripcion} icon={'text-format'} />
       <Pickers label={'descripcion_marca'} selectedValue={selectedMarca} setSelectedValue={setSelectedMarca} items={marca} text={'Marca'} icon={'city'} />
       <Pickers label={'descripcion_categoria'} selectedValue={selectedCategoria} setSelectedValue={setSelectedCategoria} items={categoria} text={'Categoria'} icon={'city'} />
       <Pickers label={'nom_prov'} selectedValue={selectedProveedores} setSelectedValue={setSelectedProveedores} items={proveedores} text={'Proveedores'} icon={'city'} />

        <Boton onPress={editarFoto} text={'Actualizar foto'}> </Boton>
         
            </View>
          
            <Footer></Footer>
        </View>
        </ScrollView>
          );
        }
  //---------------------------predeterminado-----------------------------------------------   
    return (
        
        <ScrollView>
        <View style={styles.container}>
            <Header  busqueda={true}  icon={'chevron-left'}></Header>
           
            <View style={styles.tarjeta}>
            <Text style={styles.infoProducto}>NUEVO PRODUCTO</Text>
            
            <Image source={{ uri: 'https://i.imgur.com/TkIrScD.png' }} style={styles.logo} />
     
        <Boton onPress={openImagePickerAsync} text={'Pick a photo'}> </Boton>
        <Texts text={'Nombre Producto'}/>
            <TextBox text={'Producto'} setValue={setDescripcion} value={descripcion} icon={'text-format'} />
       <Pickers label={'descripcion_marca'} selectedValue={selectedMarca} setSelectedValue={setSelectedMarca} items={marca} text={'Marca'} icon={'city'} />
       <Pickers label={'descripcion_categoria'} selectedValue={selectedCategoria} setSelectedValue={setSelectedCategoria} items={categoria} text={'Categoria'} icon={'city'} />
       <Pickers label={'nom_prov'} selectedValue={selectedProveedores} setSelectedValue={setSelectedProveedores} items={proveedores} text={'Proveedores'} icon={'city'} />
       <Texts text={'Cantidad por unidad'}/>
            <TextBox text={'Cantidad por unidad'} setValue={setDescripcion} value={descripcion} icon={'text-format'} />
            <Texts text={'Costo'}/>
            <TextBox text={'Costo'} setValue={setDescripcion} value={descripcion} icon={'text-format'} />
            <Texts text={'Precio venta'}/>
            <TextBox text={'Precio'} setValue={setDescripcion} value={descripcion} icon={'text-format'} />
            <Texts text={'Stock'}/>
            <TextBox text={'Stock'} setValue={setDescripcion} value={descripcion} icon={'text-format'} />
            <Texts text={'Descuento'}/>
            <TextBox text={'Descuento'} setValue={setDescripcion} value={descripcion} icon={'text-format'} />
        <Boton onPress={editarFoto} text={'Guardar Producto'}> </Boton>
         
            </View>
          
            <Footer></Footer>
        </View>
        </ScrollView>
    );
}

//-----------------------------------styles-------------------------------------

const styles = StyleSheet.create({
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
        width: 250,
        height: 250,
        marginTop: '5%',
        marginBottom: '2%',
        padding: 10,
        alignSelf:'center'
    },
    tarjeta: {
        flex: 3,
        padding: 10,
        backgroundColor: '#fff',

        shadowOffset:
        {
            width: 0,
            height: 5,
        },
        flexDirection: 'column',
        shadowOpacity: 0.44,
        shadowRadius: 5,
        elevation: 16,
        width: '90%',
        flexGrow: 1,
        borderRadius: 20,
        maxWidth: 500,
         height: "100%",
         minHeight: 170,
        margin: 10
    },
    infoProducto: {
        color: '#000',
        fontSize: 25,
        flex: 0,
        marginLeft: '10%',
        marginRight: '10%',
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10
    },

   
})
export default PantallaAgregarP;
