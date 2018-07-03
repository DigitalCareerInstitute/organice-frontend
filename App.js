import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import RegForm from './components/RegForm';
import { createStackNavigator } from 'react-navigation';

class main extends React.Component {

	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.container}>
				<RegForm />
				<TouchableOpacity style={styles.button}>
					<Text style={styles.btnText}>
						hii
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const NavigationApp = createStackNavigator(
	{
		Main: { screen: main }
	}
);

export default class App extends React.Component {
	render() {
		return <NavigationApp />;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#224a5f',
		padding: 20
	},
	button: {
		alignSelf: 'stretch',
		alignItems: 'center',
		padding: 20,
		backgroundColor: '#0fa1ff',
		marginTop: 30
	},
	btnText: {
		color: '#fff',
		fontWeight: 'bold'
	}
});
