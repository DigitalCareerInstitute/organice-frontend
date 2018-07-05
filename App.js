import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import RegForm from './components/RegForm';
import LogInForm from './components/LogInForm';
import Camera from './components/CameraComponent';
import { createSwitchNavigator } from 'react-navigation';

export default class App extends React.Component {
	render() {
		return <MyNavigator />;
	}
}

class ScreenComponentHome extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<RegForm />
				<Button
					title=" Register"
					onPress={() => this.props.navigation.navigate('Register')}
				/>
			</View>
		);
	}
}

class ScreenComponentRegister extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<LogInForm />
				<Button
					title="Please Log In"
					onPress={() => this.props.navigation.navigate('logIn')}
				/>
			</View>
		);
	}
}

class ScreenComponentLogIn extends React.Component {
	render() {
		return (
			<View style={styles.camera}>
				<Camera />
				<Button
					title={'Home'}
					onPress={() => this.props.navigation.navigate('Home')}
				/>
			</View>
		);
	}
}

const MyNavigator = createSwitchNavigator({
	Home: ScreenComponentHome,
	Register: ScreenComponentRegister,
	logIn: ScreenComponentLogIn
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#224a5f',
		padding: 20
	},
	camera: {
		flex: 1,
		alignSelf: 'stretch',
		// alignItems: 'center',
		paddingTop: 24,
		justifyContent: 'center',
		backgroundColor: '#224a5f'
		// padding: 20
	}
});
