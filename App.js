import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, Text, View, FlatList, ScrollView, RefreshControl, Image, TextInput, NativeModules, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Separator = () => (
  <View style={styles.separator} />
)

const url = "http://10.88.4.15:8080/fruits/"

function HomeScreen() {

  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then(response => response.json())
      .then((responseJson) => {
        console.log('getting data from fetch', responseJson);
        setData(responseJson);
        setLoading(false)
      })
      .catch(error => console.log('errores', error));
  }, [])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const subirImagen = (nombre) => {
    const imgs = {
      Uvas: "https://frutasolivar.com/wp-content/uploads/2020/05/40010140_s.jpg",
      Piña: "https://www.65ymas.com/uploads/s1/48/35/18/bigstock-whole-pineapple-and-pineapple-382336442_1_621x621.jpeg",
      Manzana: "https://www.recetasnestlecam.com/sites/default/files/2022-04/tipos-de-manzana-royal-gala.jpg",
      Melocoton: "https://img.freepik.com/fotos-premium/frutas-melocoton-rebanada-hojas-verdes-aisladas_80510-572.jpg",
      sinimagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNK7-n-r_w_qCEIjsnu8VXMBamUkSmLUr9Eg&usqp=CAU"
    }
    return (
      imgs[nombre] ?? imgs.sinimagen
    )
  }

  const printElement = ({ item }) => {

    return (
      <View style={{ margin: 10, padding: 10, borderWidth: 1, borderColor: "gray" }}>
        <Text style={styles.text}>{item.id}:Nombre: {item.name}Precio: {item.price}€ </Text>
        <Image style={styles.imagen} source={{ uri: subirImagen(item.name) }}></Image>
        <Button
          onPress={() => {
            BorrarFruta(item.id)
            NativeModules.DevSettings.reload()
          }}
          title={"BORRAR FRUTA"}
        />
      </View>

    )
  }

  return (
    <FlatList
      data={data}
      renderItem={printElement}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />

  );
}

function SettingsScreen() {
  const [form, setForm] = useState({ id: 0, name: "", price: "" })
  const [errorPrice, setErrorPrice] = useState("")

  const checkNumero = (value) => {

    const reg = /^[0-9]+(\.[0-9]+)?$/;
    if (!reg.test(value)) {
      setErrorPrice(<Text style={styles.error}>error, introduce un número</Text>)
    } else {
      setErrorPrice("")
    }
    setForm({ ...form, price: value })

  }

  return (
    <View style={styles.botones}>
      <Text style={styles.title}>
        Fruit Name:
      </Text>
      <Separator />
      <TextInput placeholder='Por favor introduzca el nombre de la fruta' onChangeText={value => setForm({ ...form, name: value })} value={form.name} style={styles.input} />
      <Separator />
      <Text style={styles.title}>
        Fruit Price:
      </Text>
      <TextInput placeholder='Por favor introduzca el precio de la fruta' onChangeText={value => checkNumero(value)} value={form.price} style={styles.input} />
      <Text>{errorPrice}</Text>
      <Separator />
      <Button
        onPress={() => {
          SubirFruta(form);
          NativeModules.DevSettings.reload()
        }}
        title={"AÑADIR FRUTA"}
      />
    </View>
  )
}

function SubirFruta(data) {

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.json())
  alert('Successfully created')


}

function BorrarFruta(id) {

  fetch(url + id, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .catch(e => console.log(e))
  alert('Deleted successfully')

}

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Mercado') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Añadir Fruta') {
              iconName = focused ? 'nutrition' : 'nutrition-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'blue',
        })}
      >
        <Tab.Screen name="Mercado" component={HomeScreen} />
        <Tab.Screen name="Añadir Fruta" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',

  },
  botones: {
    paddingTop: 90,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    margin: 15
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  imagen: {
    width: '100%',
    height: 300,
  },
  texto: {
    color: 'white',
    fontSize: 30
  },
  text: {
    fontSize: 20,
  },
  input: {
    borderWidth: 1
  },
  title: {
    textAlign: 'left',
  },
  error: {
    color: 'red'
  }


})
