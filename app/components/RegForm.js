import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class RegForm extends React.Component {
	render() {
		return (
			<View style={styles.regForm}>
				<Text style={styles.header}>Please Register</Text>
				<TextInput
					style={styles.textInput}
					placeholder="First Name"
					underlineColorAndroid={'transparent'}
				/>
				<TextInput
					style={styles.textInput}
					placeholder="Last Name"
					underlineColorAndroid={'transparent'}
				/>
				<TextInput
					style={styles.textInput}
					placeholder="Your Email"
					underlineColorAndroid={'transparent'}
				/>
				<TextInput
					style={styles.textInput}
					placeholder="Your Password"
					underlineColorAndroid={'transparent'}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	regForm: {
		alignSelf: 'stretch'
	},
	header: {
		fontSize: 20,
		color: '#fff',
		paddingBottom: 10,
		marginBottom: 40,
		borderBottomColor: '#199187',
		borderBottomWidth: 1
	},
	textInput: {
		alignSelf: 'stretch',
		height: 40,
		marginBottom: 30,
		color: '#fff',
		borderBottomColor: '#f8f8f8',
		borderBottomWidth: 1
	}
});
