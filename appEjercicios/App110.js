import React, { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';

//Esto es el MAIN
export default function App() {
	const nombre = 'Jorge';
	const apellidos = 'Díaz';
	const [ edad, setEdad ] = useState(0);
	const [ texto, setTexto ] = useState(null);
	const [ color, setColor ] = useState(null);
	const [ valida, setValida ] = useState(false);
	

	return (
		<View style={estilos.container}>
			<Text>
				Hola mi nombre es <Text style={{ color: 'blue' }}>{nombre}</Text>
				<Text style={{ color: 'red' }}> {apellidos}</Text>
			</Text>

			<Text>Escriba aquí su edad {edad}</Text>
			<TextInput
				defaultValue=""
				placeholder="Edad"
				style={
					valida ? (
						{  borderBottomWidth: 2, height: 40, borderColor: 'green' }
					) : (
						{  borderBottomWidth: 2, height: 40, borderColor: 'red' }
					)
				}
				onChangeText={(edad) => validarEdad(edad)}
			/>

			<Button onPress={decirEdad} title={'FINALIZAR'} />
			<Text style={{ color: color }}>{texto}</Text>
			<Text>Gracias por rellenar el formulario</Text>
		</View>
	);

	function decirEdad() {
		//return edad == 18 ? 'Acabas de cumplir la mayoria de edad' : edad > 18 ? "Eres mayor de edad" : "Eres menor de edad"

		if (edad == 18) {
			setTexto('Qué jóven eres');
			setColor('blue');
		} else if (edad < 18) {
			setTexto('Qué buena edad');
			setColor('red');
		} else {
			setTexto('Eres mayor de edad');
			setColor('green');
		}
	}

	function validarEdad(edad) {
		const reg = /^[0-9]+/;
		if (reg.test(edad)) {
			setValida(true);
			setEdad(edad);
		} else {
			console.log('Soy una letra');
			setValida(false);
		}
	}
}

const estilos = StyleSheet.create({
	container: {
		marginTop: 50,
		padding: 25,
		backgroundColor: 'white'
	},

	verde: {
		color: 'green',
		fontWeight: 'bold',
		fontSize: 30
	},

	rojo: {
		color: 'red'
	},

	azul: {
		color: 'blue'
	}
});
