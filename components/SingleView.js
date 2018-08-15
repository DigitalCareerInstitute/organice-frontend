import React from "react";
import { DOMAIN } from "react-native-dotenv";
import {
	StyleSheet,
	Text,
	View,
	Image,
} from "react-native";
import { SearchBar, Icon } from "react-native-elements";
import SvgUri from "react-native-svg-uri";
import { data } from "../db.js";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		marginBottom: 1,
		width: 300,
		height: 280,
	},
	content: {
		backgroundColor: '#fff',
		width: 300,
		height: 100,
		paddingTop: 10,
		marginBottom: 5,
		marginTop: 5,
		borderRadius: 10
	},
	title: {
		fontSize: 20,
		paddingTop: 10,
		color: "#ff7539"
	},
	date: {
		fontSize: 20,
		paddingTop: 10
	}
});

class SingleView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			loading: true
		};
	}

	render() {
		const imageFile = this.props.navigation.state.params.item.image
		// console.log(imageFile)
		return this.state.loading ? (
			<View style={styles.container}>
				<Text style={styles.title}>{this.props.navigation.state.params.item.title}</Text>

				<Text style={styles.content}>{this.props.navigation.state.params.item.content}</Text>


				<Image
					style={styles.image}
					source={{ uri: `data:image/jpg;base64,${imageFile}` }}
				/>
			</View>

		) : (

				<View>
					<Text>LOADING ....</Text>
				</View>
			);
	}
}

export default SingleView;
