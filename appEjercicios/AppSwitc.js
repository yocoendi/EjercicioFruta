import React, { useState } from 'react';
import { Image, View, ScrollView, Switch, Text } from 'react-native';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';

export default function App() {
	const [ isEnabled, setIsEnable ] = useState(null);

	return (
		<ScrollView>
			<View style={{ alignItems: 'center' }}>
				<Text
					style={{
						paddingTop: 30,
						paddingBottom: 30,
						paddingHorizontal: 6,
						fontSize: 21,
						color: '#212F3D',
						justifyContent: 'center',
						textAlign: 'center'
					}}
				>
					LOS 5 MEJORES CERDOS VIETNAMITAS
				</Text>
				<Switch
					//fondito del interruptor
					trackColor={{ false: '#BDBDBD', true: '#616161' }}
					//el color de la bolita
					thumbColor={isEnabled ? '#BDBDBD' : '#616161'}
					onValueChange={() => setIsEnable((previousState) => !previousState)}
					value={isEnabled}
				/>

				<Image
					style={{
						width: 280,
						height: 220,
						borderWidth: 2,
						borderColor: '#2E4053',
						margin: 6,

						//Mostrar cerdo o no mostrarlo
						opacity: isEnabled ? 100 : 0
					}}
					source={require('./assets/cerdo.jpg')}
				/>

				<Image
					style={{
						width: 280,
						height: 220,
						borderWidth: 2,
						borderColor: '#2E4053',
						margin: 6,

						//Mostrar cerdo o no mostrarlo
						opacity: isEnabled ? 100 : 0
					}}
					source={require('./assets/cerdo2.jpg')}
				/>

				<Image
					style={{
						width: 280,
						height: 220,
						borderWidth: 2,
						borderColor: '#2E4053',
						margin: 6,

						//Mostrar cerdo o no mostrarlo
						opacity: isEnabled ? 100 : 0
					}}
					source={require('./assets/cerdo3.jpg')}
				/>

				<Image
					style={{
						width: 280,
						height: 220,
						borderWidth: 2,
						borderColor: '#2E4053',
						margin: 6,

						//Mostrar cerdo o no mostrarlo
						opacity: isEnabled ? 100 : 0
					}}
					source={require('./assets/cerdo4.jpg')}
				/>

				<Image
					style={{
						width: 280,
						height: 220,
						borderWidth: 2,
						borderColor: '#2E4053',
						margin: 6,

						//Mostrar cerdo o no mostrarlo
						opacity: isEnabled ? 100 : 0
					}}
					source={require('./assets/cerdo5.jpg')}
				/>
			</View>
		</ScrollView>
	);
}
