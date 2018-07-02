import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Expo from 'expo';
import RegForm from './app/components/RegForm';
import { StackNavigator } from 'react-navigation';

class RegisterScreen extends React.Component {
	static navigationOptions = {
		title: 'Register'
	};
	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.container}>
				<RegForm />
				<TouchableOpacity style={styles.button}>
					<Text onPress={() => navigate('Home')} style={styles.btnText}>
						Sign In
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

class HomeScreen extends React.Component {
	static navigationOptions = {
		title: 'Home'
	};
	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.regForm}>
				{/* <RegForm /> */}
				<Text onPress={() => navigate('Profile')}> Navigate To Profile</Text>
			</View>
		);
	}
}

class ProfileScreen extends React.Component {
	static navigationOptions = {
		title: 'Profile'
	};
	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.regForm}>
				{/* <RegForm onPress={() => navigate('Profile')} /> */}
				<Text onPress={() => navigate('Home')} />
			</View>
		);
	}
}

const NavigationApp = StackNavigator(
	{
		Register: { screen: RegisterScreen },
		Home: { screen: HomeScreen },
		Profile: { screen: ProfileScreen }
	},
	{
		navigationOptions: {
			headerStyle: {
				marginTop: Expo.Constants.statusBarHeight
			}
		}
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
