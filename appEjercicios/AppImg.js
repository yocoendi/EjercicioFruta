import React, { useState } from 'react';
import { Image, StyleSheet, ScrollView, Switch, TouchableOpacity, opacity } from 'react-native';
import img from './img/ima.jpg';

export default function App() {
	const [ isEnabled, setIsEnabled ] = useState(false);

	return (
		<ScrollView>
			<Switch
				trackColor={{ false: 'green', true: 'yellow' }}
				thumbColor={isEnabled ? 'blue' : 'red'}
				onValueChange={() => setIsEnabled((previousState) => !previousState)}
				value={isEnabled}
			/>
			

			{isEnabled ? <Image style={styles.myImageStyle} source={ima} /> : null}
				<Image
					style={styles.myImagesStyle1}
					source={{
						uri:
							'https://www.shutterstock.com/image-photo/hand-touching-screen-icon-throw-260nw-696395281.jpg'
					}}
				/>
			

			<Image
				style={styles.myImagesStyle1}
				source={{
					uri: 'https://www.shutterstock.com/image-photo/hand-touching-screen-icon-throw-260nw-696395281.jpg'
				}}
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 30,
		paddingTop: 100,
		backgroundColor: '#808080'
	},

	myImagesStyle1: {
		marginTop: 5,
		height: 500,
		width: '100%'
	},
	myImagesStyle2: {
		marginTop: 100,
		height: 500,
		width: '100%'
	}
});
