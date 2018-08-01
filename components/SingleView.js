import React from "react";
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

	componentWillMount() {
		//10.0.2.2
		fetch(`http://10.0.1.34:8080/api/scans/5b6030198b24ff167c8e5eea`, {
			method: "get",
			headers: new Headers({
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hamRAZXhhbXBsZS5jb20iLCJpZCI6IjViNjAyZjI2OGIyNGZmMTY3YzhlNWVlOSIsImlhdCI6MTUzMzAzMDE4Mn0.VdQNyI_hcZP_gzO8Jdi1awET53wEcZcnbpULQE_CZao"
			})
		})
			.then(res => res.json())
			.then(res => {
				const data = res;
				this.setState(state => {
					state.data = data;
					state.loading = false;
					return state;
				});
				return data;
			})
			.catch(err => console.error(err));
	}
	render() {
		console.log(this.state.data);
		return this.state.loading ? (
			<View>
				<Text>LOADING ....</Text>
			</View>
		) : (
				<View style={{ padding: 10 }}>
					<Text style={styles.title}>{this.state.data.scan.title}</Text>
					<Text style={styles.date}>{this.state.data.scan.date}</Text>
					<Text style={styles.content}>{this.state.data.scan.content}</Text>
					<Image
						style={styles.image}
						source={{
							uri:
								"https://facebook.github.io/react-native/docs/assets/favicon.png"
						}}
					/>
				</View>
			);
	}
}

export default SingleView;
