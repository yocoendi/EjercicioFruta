import React, { useState } from "react";
import { StyleSheet, Button, Text, View } from 'react-native';



export default function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

 return (

    <View style={styles.container}>

    <Text style={styles.texto}>Contador</Text>
      <View style={styles.botones}>
        <Button
          onPress={() => {
            setCount1(0);
            setCount2(0);
          }}
          title={"RESETEA"}
        />
      </View>
      <View style={styles.botones}>
        <Button
          onPress={() => {
            setCount1(count1 + 1);
          }}
          title={"DE 1 EN 1"}
        />
      </View>
      <View style={styles.botones}>
        <Button
          onPress={() => {
            setCount2(count2 + 10);
          }}
          title={"DE 10 EN 10"}
          
        />
      </View>
  
      
      <Text style={styles.texto}>Igual a 20 :{count1} </Text>
      <Text style={styles.texto}>{count1 === 20 ? <Text> 'iguales'</Text>: <Text> 'No iguales'</Text>}</Text>
      <Text style={styles.texto}>Contador 10 + 10: {count2}</Text>
    </View>
  )
}

const styles = StyleSheet.create({


  container:{

    flex:1,
    padding: 30,
    paddingTop: 100,
    backgroundColor: '#808080'
  }
  ,

  botones: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 200,
    backgroundColor: 'white'
  },

  texto: {
    color: 'white',
    fontSize: 30,
    paddingTop: 50
   
  }
})