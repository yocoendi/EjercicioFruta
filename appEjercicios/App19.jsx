import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function App() {
	return (
		<View style={styles.container}>
			<Text style={styles.titulo}>Hello</Text>
			<Text style={styles.texto}>Sign In to your count</Text>
			<TextInput placeholder="correo@correo.com" style={styles.input} />

			<TextInput placeholder="password" style={styles.input} />
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		marginHorizontal: 5,
		alignItems: 'center',
		justifyColor: 'center',
		backgroundColor: '#f1f1f1'
	},
	separator: {
		marginVertical: 8,
		borderBottomColor: '#737373',
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	titulo: {
		fontSize: 80,
		color: '#34434D',
		fontWeight: 'bold'
	},
	texto: {
		color: 'grey',
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
		borderRadius: 200
	},
	input: {
		height: 50,
		borderWidth: 1,
		padding: 10,
		borderColor: 'gray',
		borderRadius: 30,
		marginTop: 20,
		width: '80%',
		backgroundColor: '#fff',
		paddingStart: 30
	},
	textoResulatdo: {
		color: 'red',
		fontSize: 20
	}
});
