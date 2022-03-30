import React from 'react'
import { Pressable,StyleSheet,Text,TouchableOpacity } from 'react-native'
import Icons from  'react-native-vector-icons/FontAwesome5'

const IconButton = ({ textColor="white",onPress,text,color='#C70039',icon,iconColor='white'})=>{
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container,{backgroundColor:color}]}>
            
            <Icons name={icon} color={iconColor}  size={70}/>
            <Text style={[styles.text,{color:textColor}]}>
                {text}
            </Text>
        </TouchableOpacity>


    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        width:170,
        padding:15,
        height:170,
        alignItems:'center',
        borderRadius:10,
        marginVertical:10,
        marginHorizontal:15,
        shadowColor: "#C70039",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        
    },
    text:{
        fontWeight:'bold',
        color:'white',
        fontSize:20,
         textAlign:'center',
        justifyContent:'center',
    }
})

export default IconButton;