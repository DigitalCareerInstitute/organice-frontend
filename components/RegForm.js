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

export default class RegForm extends Component {
	constructor(props) {
		super(props);
		state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			repeatPassword: ''
		};
	}

	onClickListener = viewId => {
		Alert.alert('Alert', 'Button pressed ' + viewId);
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.inputs}
						placeholder="First Name"
						keyboardType="text"
						onChangeText={firstName => this.setState({ firstName })}
					/>
				</View>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.inputs}
						placeholder="last Name"
						secureTextEntry="text"
						onChangeText={lastName => this.setState({ lastName })}
					/>
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.inputs}
						placeholder="Email"
						secureTextEntry="email-address"
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
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.inputs}
						placeholder="repeatPassword"
						secureTextEntry={true}
						onChangeText={repeatPassword => this.setState({ repeatPassword })}
					/>
				</View>

				<TouchableHighlight
					style={[styles.buttonContainer, styles.loginButton]}
					onPress={() => this.onClickListener('login')}
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
