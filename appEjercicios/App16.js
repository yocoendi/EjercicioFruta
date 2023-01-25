import React, { useState } from "react";
import { StyleSheet, Button, Text, View, SafeAreaView, TextInput, Alert, Linking  } from 'react-native';

const Separator = () => (
  <View style={styles.separator} />
);

export default function App() {

  const [edad, setEdad] = useState(null);
  var stop = false;
  //,location.assign("continue.html")


  const alertar = () => {

    //return edad == 18 ? 'Acabas de cumplir la mayoria de edad' : edad > 18 ? "Eres mayor de edad" : "Eres menor de edad"

    return edad >= 18 ? 
      (alert("OK, puedes continuar."),
      Linking.openURL("https://www.abc.es")
      //location.assign()
  ) : (
      stop = true,
      alert("Disculpa, eres menor de edad no y puedes acceder a este contenido")
  );

  }



  return (

    <SafeAreaView style={styles.container}>

      <View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.texto}>Hola mi nombre es </Text>
          <Text style={styles.textoNombre}>Jorge Diaz</Text>
        </View>
        <Separator />
        <Text style={styles.texto}>Escribe aqui tu edad</Text>
        <View>
          <TextInput
            style={styles.input}// Estilo del inpumt
            placeholder="Edad..."
            keyboardType="numeric"
            onChangeText={edad => setEdad(edad)}
          />
        </View>
        <Separator />
        <View style={styles.botones}>
          <Button 
          color="#f194ff"
          title="Finalizar" 
          onPress={alertar} />
        </View>
      </View>

    </SafeAreaView>


  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    backgroundColor: '#cccccc'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  texto: {
    color: 'black',
    fontSize: 20,
    paddingTop: 50
  },
  textoNombre: {
    color: 'blue',
    fontSize: 20,
    paddingTop: 50
  },
  botones: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 200,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textoResulatdo: {
    color: 'red',
    fontSize: 20,
  }



})

