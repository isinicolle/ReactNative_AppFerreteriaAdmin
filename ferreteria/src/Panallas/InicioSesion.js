import { StatusBar } from 'expo-status-bar';
import { TextInput, StyleSheet, Text, View, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Boton, HiperVinculo, TextBox, PasswordBox, Footer } from '../componentes/'
import react, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const login = "http://192.168.100.48:6001/api/usuarioempleados/loginUsuarioEmpleado"

const Pantalla = ({ navigation }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [log, setLog] = useState(false)

  const nav = useNavigation();
  useEffect(() => { }, [navigation])
  const handleLogin = async () => {
    try {
      const res = await fetch(login,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nom_usuarioEmpleado: user,
            contra_empleado: pass
          })
        }
      );
      const json = await res.json()
      const info = {
        token: json.data.token,
        id_empleado: json.data.data.id_empleado,
        id_usuarioEmpleado: json.data.data.id_usuarioEmpleado,
        id_rol:json.data.data.Empleados.id_rol
      }

      await AsyncStorage.setItem('token', info.token);
      await AsyncStorage.setItem('idEmpleado', info.id_empleado + '');
      await AsyncStorage.setItem('idUsuario', info.id_usuarioEmpleado + '');
      await AsyncStorage.setItem('idRol',info.id_rol+'');
      await nav.navigate('Inicio');
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {log ? <Text>Se ha iniciado sesion</Text> : <ScrollView >
        <View style={styles.container}>
          <Image style={styles.logo} source={require('../../assets/Images/Imagotipo.png')} />
          <Text style={styles.header}>Bienvenido! Administracion Ferretear</Text>

          <View style={styles.tarjeta}>
            <TextBox value={user} setValue={setUser} text={'Nombre de Usuario'} icon={'person-pin'} />
            <PasswordBox value={pass} setValue={setPass} text={'Contraseña'} />
            <Boton text={'Iniciar Sesion'} onPress={handleLogin} />
            <HiperVinculo text={'¿Has olvidado la contraseña?'} onPress={() => {
              nav.push("OlvidarContra")
            }} />
          </View>
          <Footer />
        </View>
      </ScrollView>}

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    height: '100%'
  },
  logo: {
    width: 102,
    height: 102,
    marginTop: '10%',
    marginBottom: '2%',
    padding: 10,
  },
  tarjeta: {
    flex: 1,
    padding: 10,
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
    width: '90%',
    flexGrow: 1,
    borderRadius: 20,
    maxWidth: 500
  },
  header: {
    color: '#000',
    fontFamily: 'Arial' || null,
    fontFamily: 'sans-serif',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 0,
    marginLeft: '10%',
    marginRight: '10%',
    textAlign: 'center',
    marginBottom: 20
  },
  h1Tarjeta: {
    color: '#000',
    fontFamily: 'Arial' || null,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 20
  },
  h2Tarjeta: {
    color: '#000',
    fontFamily: 'Arial' || null,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 20
  }
})
export default Pantalla;
