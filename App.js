import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, Text, View, FlatList, ScrollView, Image, TextInput, Alert, RefreshControl } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Separator = () => (
  <View style={styles.separator} />
)



const url = "http://192.168.0.17:8080/fruits/"

function HomeScreen() {
 
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagen, setImagen] = useState(null);
  

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

  const printElement = ({ item }) => {

        


    return (

      <ScrollView>
        <Text style={styles.text}>Id: {item.id}</Text>
        <Text style={styles.text}>Name: {item.name}</Text>
        <Text style={styles.text}>Price: {item.price} €</Text>
        <Image style={styles.imagen} source ={{uri: 
        item.name==='Piña'?'https://www.65ymas.com/uploads/s1/48/35/18/bigstock-whole-pineapple-and-pineapple-382336442_1_621x621.jpeg':
        item.name==='Manzana'?'https://www.recetasnestlecam.com/sites/default/files/2022-04/tipos-de-manzana-royal-gala.jpg': 
        item.name==='Melocotón'?'https://img.freepik.com/fotos-premium/frutas-melocoton-rebanada-hojas-verdes-aisladas_80510-572.jpg':
        item.name==='Uvas'?'https://frutasolivar.com/wp-content/uploads/2020/05/40010140_s.jpg':
        item.name==='Kiwi'?'http://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/14.jpg':
        item.name==='Naranja'?'https://jlsupervia.es/wp-content/uploads/2020/03/pasta-aroma-naranja.jpg':
        item.name==='Plátano'?'https://cdn.shopify.com/s/files/1/0492/2458/1274/products/8095c14d-a4df-456e-89ab-429175ac02f1_1024x1024.png?v=1622197543':
        item.name==='Pera'?'https://thumbs.dreamstime.com/b/fruta-amarilla-de-la-pera-con-la-hoja-aislada-en-blanco-51277144.jpg':null}}></Image>

      </ScrollView>

    )
  }

  return (
    <FlatList
      data={data}
      renderItem={printElement}
      refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }
    />

  );
}

function SettingsScreen() {
  const [form, setForm] = useState({ id: 0, name: "", price: ""})

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
      <TextInput placeholder='Por favor introduzca el precio de la fruta' onChangeText={value => setForm({ ...form, price: value })} value={form.price} style={styles.input} />
      <Separator />
      <Button
        onPress={() => {
          SubirFruta(form);
      
        }}
        title={"SUBIR FRUTA"}
      />
      <Separator />
      <TextInput placeholder='Introduzca el id que desea borrar'onChangeText={value => setForm({ ...form, id: value })} value={form.id} style={styles.input} />
      <Button
        onPress={() => {
          BorrarFruta(form.id);
        }}
        title={"BORRAR FRUTA"}
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
            } else if (route.name === 'Fruta') {
              iconName = focused ? 'nutrition' : 'nutrition-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'blue',
        })}
      >
        <Tab.Screen name="Mercado" component={HomeScreen} />
        <Tab.Screen name="Fruta" component={SettingsScreen} />
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

    

  }
})
