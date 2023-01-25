import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList, ScrollView } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const [fruits, setFruits] = useState(null);







function HomeScreen() {
    
    useEffect(() => {

        fetch("http://172.20.10.7:8080/fruits")

            .then(response => response.json())
            .then((responseJson) => {
                console.log('getting data from fetch', responseJson);
                setFruits(responseJson);

            })

            .catch(error => console.log('errores', error));

    }, [])
    
    const printElement = ({ item }) => {

        return (

            <ScrollView>
                <Text style={styles.texto}>{item.id}: {item.name}, {item.price}€</Text>
            </ScrollView>

        )

    }
    return (

        <FlatList
            data={fruits}
            renderItem={printElement}
            keyExtractor={fruits => fruits.id}
        />
    );
}

function subirFruta() {

    let data = {
        method: 'POST',

        body: JSON.stringify({
            name: 'watermelon',
            price: 1.98
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        }
    }
    return fetch('/appointments/get_appos', data)
        .then(response => response.json())  // promise
        .then(json => dispatch(receiveAppos(json)))
        .catch(error => console.log('errores', error));

}


function Ajustes() {
    return (
        <View style={styles.view}>
            <Button
                onPress={() => {
                    subirFruta();
                }}
                title={"UP FRUIT"}
            />
        </View>


    );
}

function GrupoHome() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Lista de Frutas" }} />
            <Stack.Screen name="Profile" component={subirFruta} options={{ title: "Subir Fruta" }} />
        </Stack.Navigator>
    );
}

export default function App() {

    return (


        <NavigationContainer>

            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'bandage' : 'bandage-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'green',
                    tabBarInactiveTintColor: 'blue',
                })}
            >
                <Tab.Screen name="Home" component={GrupoHome} />
                <Tab.Screen name="Settings" component={Ajustes} />

            </Tab.Navigator>

        </NavigationContainer>

    );

}



const styles = StyleSheet.create({

    texto: {
        color: 'black',
        fontSize: 20,
        width: 100,

    },

    view: {

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    }

})