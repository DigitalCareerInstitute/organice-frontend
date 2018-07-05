import React from 'react';	
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';	

const styles = StyleSheet.create({		
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

class Settings extends React.Component {	
	static navigationOptions = {	
		title: 'Settings'	
	};	
	render() {	
		const { navigate } = this.props.navigation;	
		return (	
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >	
				<TouchableOpacity style={styles.button}>	
					<Text style={styles.btnText}>	
            Settings View
					</Text>	
				</TouchableOpacity>	
			</View>	
		);	
	}	
}

export default Settings;