import React from "react";
import { DOMAIN } from "react-native-dotenv";
import {
	StyleSheet,
	Text,
	View,
	Image,
	FlatList,
	TouchableOpacity,
	TouchableHighlight,
	Modal,
	TextInput
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
		console.log(this.props.navigation.state.params.item)
		return this.state.loading ? (
			<View style={{ padding: 10 }}>
				<Text style={styles.title}>{this.props.navigation.state.params.item.title}</Text>
				<Text style={styles.date}>{this.props.navigation.state.params.item.title}</Text>
				<Text style={styles.content}>{this.props.navigation.state.params.item.content}</Text>
				<Image
					style={styles.image}
					source={{
						uri:
							"https://facebook.github.io/react-native/docs/assets/favicon.png"
					}}
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
