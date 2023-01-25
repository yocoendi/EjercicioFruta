import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

export default function App() {


    const [texto, setTexto] = useState('');
        var regex = /^[a-zA-Z]+$/;
   
    return (
        
        <View>
            <Text>Hola</Text>
            <TextInput
                defaultValue=""
                placeholder="Texto"
                onChangeText={texto => setTexto(texto)}
            />
            {!texto.match (regex) ? <Text> Es un numero</Text>: <Text>Es letra</Text>}
        </View>
    )

}
