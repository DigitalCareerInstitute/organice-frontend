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
	image: {
		width: 300,
		height: 300
	},
	content: {
		fontSize: 16,
		paddingTop: 10,
		paddingBottom: 10
	},
	title: {
		fontSize: 20,
		paddingTop: 10
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
		console.log(imageFile)
		return this.state.loading ? (
			<View style={{ padding: 10 }}>
				<Text style={styles.title}>{this.props.navigation.state.params.item.title}</Text>
				<View>
					<Text style={styles.content}>{this.props.navigation.state.params.item.content}</Text>
				</View>
				<View>
					<Image
						style={styles.image}
						source={{ uri: `data:image/jpg;base64,${imageFile}` }}
					/>
				</View>
			</View>
		) : (

				<View>
					<Text>LOADING ....</Text>
				</View>
			);
	}
}

export default SingleView;
