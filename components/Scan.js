import { Constants, Camera, FileSystem, Permissions } from 'expo';
import React from 'react';
// import Photo from './Photo';
import {
	StyleSheet,
	Image,
	Text,
	View,
	TouchableOpacity,
	Platform
} from 'react-native';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const landmarkSize = 2;

const flashModeOrder = {
	off: 'on',
	on: 'auto',
	auto: 'torch',
	torch: 'off'
};

const flashIcons = {
	off: 'flash-off',
	on: 'flash-on',
	auto: 'flash-auto',
	torch: 'highlight'
};

export default class CameraScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			flash: 'off',
			type: 'back',
			ratio: '16:9',
			ratios: [],
			faceDetecting: false,
			faces: [],
			newPhotos: false,
			permissionsGranted: false,
			pictureSize: undefined,
			pictureSizes: [],
			pictureSizeId: 0
			// selected: false,
			// faces: [],
			// image: null
		};
	}

	async componentWillMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ permissionsGranted: status === 'granted' });
	}

	componentDidMount() {
		FileSystem.makeDirectoryAsync(
			FileSystem.documentDirectory + 'photos'
		).catch(e => {
			console.log(e, 'Directory exists');
		});
	}

	ensureFolderExists() {
		const path = `${FileSystem.documentDirectory}MyFolder`;
		return FileSystem.getInfoAsync(path).then(({ exists }) => {
			if (!exists) {
				return FileSystem.makeDirectoryAsync(path);
			} else {
				return Promise.resolve(true);
			}
		});
	}

	toggleFlash = () =>
		this.setState({ flash: flashModeOrder[this.state.flash] });

	takenPicture = async () => {
		if (this.camera) {
			let photo = await this.camera.takePictureAsync();
			console.log('Photo made: ', photo);
			this.setState({ lastShotURI: photo.uri });
		}
	};

	onPictureSaved = async photo => {
		await FileSystem.moveAsync({
			from: photo.uri,
			to: `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`
		});
		this.setState({ newPhotos: true });
	};

	collectPictureSizes = async () => {
		if (this.camera) {
			const pictureSizes = await this.camera.getAvailablePictureSizesAsync(
				this.state.ratio
			);
			let pictureSizeId = 0;
			if (Platform.OS === 'ios') {
				pictureSizeId = pictureSizes.indexOf('High');
			} else {
				//returned array is sorted in ascending order - default size is the largest one
				pictureSizeId = pictureSizes.length - 1;
			}
			this.setState({
				pictureSizes,
				pictureSizeId,
				pictureSize: pictureSizes[pictureSizeId]
			});
		}
	};

	previousPictureSize = () => this.changePictureSize(1);
	nextPictureSize = () => this.changePictureSize(-1);

	changePictureSize = direction => {
		let newId = this.state.pictureSizeId + direction;
		const length = this.state.pictureSizes.length;
		if (newId >= length) {
			newId = 0;
		} else if (newId < 0) {
			newId = length - 1;
		}
		this.setState({
			pictureSize: this.state.pictureSizes[newId],
			pictureSizeId: newId
		});
	};

	renderNoPermissions = () => (
		<View style={styles.noPermissions}>
			<Text style={{ color: 'black' }}>
				Camera permissions not granted - cannot open camera preview.
			</Text>
		</View>
	);

	// Trigger = () => {
	// 	return (
	// 		<TouchableOpacity style={this.props.StyleSheet} onPress={this.props.snap}>
	// 			<View style={styles.trigger} />
	// 		</TouchableOpacity>
	// 	);
	// };

	renderTopBar = () => (
		<View style={styles.topBar}>
			<TouchableOpacity style={styles.toggleButton} onPress={this.toggleFlash}>
				<MaterialIcons
					name={flashIcons[this.state.flash]}
					size={32}
					color="white"
				/>
			</TouchableOpacity>
		</View>
	);

	renderBottomBar = () => (
		<View style={styles.bottomBar}>
			<View style={{ flex: 0.4 }}>
				<TouchableOpacity
					onPress={this.takenPicture}
					style={{ alignSelf: 'center' }}
				>
					<Ionicons name="ios-radio-button-on" size={70} color="white" />
				</TouchableOpacity>
				<TouchableOpacity>
					<Image style={styles.imgStyle} source={this.state.url} />
				</TouchableOpacity>
			</View>
		</View>
	);

	renderCamera = () => (
		<View style={{ flex: 1 }}>
			<Camera
				ref={ref => {
					this.camera = ref;
				}}
				style={styles.camera}
				onCameraReady={this.collectPictureSizes}
				type={this.state.type}
				flashMode={this.state.flash}
				ratio={this.state.ratio}
				pictureSize={this.state.pictureSize}
			>
				{this.renderTopBar()}
				{this.renderBottomBar()}
			</Camera>
		</View>
	);

	render() {
		const cameraScreenContent = this.state.permissionsGranted
			? this.renderCamera()
			: this.renderNoPermissions();
		const content = this.state.showGallery
			? this.renderGallery()
			: cameraScreenContent;
		return <View style={styles.container}>{content}</View>;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000'
	},
	imgStyle: {
		flex: 1,
		height: 40,
		width: 40
	},
	camera: {
		flex: 1,
		justifyContent: 'space-between'
	},
	topBar: {
		flex: 0.2,
		backgroundColor: 'transparent',
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingTop: Constants.statusBarHeight / 2
	},
	bottomBar: {
		backgroundColor: 'transparent',
		alignSelf: 'flex-end',
		justifyContent: 'space-between',
		flex: 0.12,
		flexDirection: 'row'
	},
	noPermissions: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10
	},
	gallery: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	toggleButton: {
		flex: 0.25,
		height: 40,
		marginHorizontal: 2,
		marginBottom: 10,
		marginTop: 20,
		padding: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	autoFocusLabel: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	bottomButton: {
		flex: 0.3,
		height: 58,
		justifyContent: 'center',
		alignItems: 'center'
	},
	// newPhotosDot: {
	// 	position: 'absolute',
	// 	top: 0,
	// 	right: -5,
	// 	width: 8,
	// 	height: 8,
	// 	borderRadius: 4,
	// 	backgroundColor: '#4630EB'
	// },
	detectors: {
		flex: 0.5,
		justifyContent: 'space-around',
		alignItems: 'center',
		flexDirection: 'row'
	},
	pictureQualityLabel: {
		fontSize: 10,
		marginVertical: 3,
		color: 'white'
	},
	pictureSizeContainer: {
		flex: 0.5,
		alignItems: 'center',
		paddingTop: 10
	},
	pictureSizeChooser: {
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row'
	},
	pictureSizeLabel: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	facesContainer: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		left: 0,
		top: 0
	},
	face: {
		padding: 10,
		borderWidth: 2,
		borderRadius: 2,
		position: 'absolute',
		borderColor: '#FFD700',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	landmark: {
		width: landmarkSize,
		height: landmarkSize,
		position: 'absolute',
		backgroundColor: 'red'
	},
	faceText: {
		color: '#FFD700',
		fontWeight: 'bold',
		textAlign: 'center',
		margin: 10,
		backgroundColor: 'transparent'
	},
	row: {
		flexDirection: 'row'
	}
});
