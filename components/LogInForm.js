import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableHighlight,
	Alert
} from 'react-native';
import SvgUri from 'react-native-svg-uri';

export default class LogInForm extends Component {
	constructor(props) {
		super(props);
		state = {
			email: '',
			password: ''
		};
	}

	onClickListener = viewId => {
		Alert.alert('Alert', 'Button pressed ' + viewId);
	};

	render() {
		return (
			<View style={styles.container}>
				<SvgUri
					width="120"
					height="120"
					source={require('../icons/logo.svg')}
				/>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.inputs}
						placeholder="Email"
						keyboardType="email-address"
						onChangeText={email => this.setState({ email })}
					/>
				</View>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.inputs}
						placeholder="Password"
						secureTextEntry={true}
						onChangeText={password => this.setState({ password })}
					/>
				</View>

				<TouchableHighlight
					style={[styles.buttonContainer, styles.loginButton]}
					onPress={() => this.onClickListener('login')}
				>
					<Text style={styles.loginText}>Login</Text>
				</TouchableHighlight>

				<TouchableHighlight
					style={[styles.buttonContainer, styles.passText]}
					onPress={() => this.onClickListener('restore_password')}
				>
					<Text>Forgot your password?</Text>
				</TouchableHighlight>

				<TouchableHighlight
					style={[styles.buttonContainer, styles.regText]}
					onPress={() => this.onClickListener('register')}
				>
					<Text>Register</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	inputContainer: {
		borderBottomColor: '#000',
		backgroundColor: '#FFFFFF',
		borderBottomWidth: 1,
		width: 250,
		height: 45,
		flexDirection: 'row',
		alignItems: 'center'
	},
	inputs: {
		flex: 1,
		alignSelf: 'stretch',
		height: 40,
		color: '#fff',
		borderBottomColor: '#f8f8f8',
		borderBottomWidth: 1
	},
	buttonContainer: {
		height: 45,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 50,
		marginBottom: 20,
		width: 250
	},
	loginButton: {
		backgroundColor: '#ff7539'
	},
	loginText: {
		color: 'white'
	}
});
