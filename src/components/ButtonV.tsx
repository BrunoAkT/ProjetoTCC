import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

function ButtonV({text, width}){
    return(
        <TouchableOpacity style={[styles.button, width ? {width} : null]}>
            <Text style={styles.textbutton}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
button:{
    width:294,
    height:40,
    borderRadius:40,
    backgroundColor: "#81C784",
    justifyContent: "center", 
    alignItems: "center",    
},
textbutton:{
    color: "#000000",
    fontSize:16,
    textAlign: "center", 
}
}
)


export default ButtonV