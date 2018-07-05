import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraComponent extends React.Component {
	state = {
		hasCameraPermission: null,
		type: Camera.Constants.Type.back,
		lastShotURI: ''
	};

	async componentWillMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' });
	}

	snap = async () => {
		if (this.camera) {
			let photo = await this.camera.takePictureAsync();
			console.log('Photo made: ', photo);
			this.setState({ lastShotURI: photo.uri });
		}
	};

	render() {
		const { hasCameraPermission } = this.state;
		if (hasCameraPermission === null) {
			return (
				<View>
					<Text>No Permissions no Love</Text>
				</View>
			);
		} else if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>;
		} else {
			return (
				<View style={{ flex: 1 }}>
					<Camera
						style={{ flex: 1 }}
						ref={ref => {
							this.camera = ref;
						}}
						type={this.state.type}
					>
						<View style={{ flex: 1 }} />
						<View style={styles.bottomBar}>
							<PreviewShot lastShotURI={this.state.lastShotURI} />
							<Trigger snap={this.snap} style={styles.bottomBarElements} />
							<Settings style={styles.bottomBarElements} />
						</View>
					</Camera>
				</View>
			);
		}
	}
}

class Settings extends React.Component {
	render() {
		return <View style={this.props.style} />;
	}
}

class Trigger extends React.Component {
	render() {
		return (
			<TouchableOpacity style={this.props.StyleSheet} onPress={this.props.snap}>
				<View style={styles.trigger} />
			</TouchableOpacity>
		);
	}
}

class PreviewShot extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View
				style={{
					width: 50,
					height: 50,
					borderRadius: 10,
					backgroundColor: 'rgba(255, 255, 255, 0.1)',
					overflow: 'hidden'
				}}
			>
				{this.props.lastShotURI ? (
					<Image source={{ uri: this.props.lastShotURI }} style={{ flex: 1 }} />
				) : (
					<View
						style={{
							height: 50,
							width: 50
						}}
					/>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	bottomBar: {
		height: 80,
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	bottomBarElements: {
		width: 50,
		height: 50
	},
	trigger: {
		backgroundColor: 'white',
		width: 50,
		height: 50,
		borderRadius: 50 / 2
	}
});
