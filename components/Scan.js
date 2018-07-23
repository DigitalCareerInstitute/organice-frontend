import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Constants, Camera, Permissions, FileSystem,} from "expo";
import { MaterialIcons } from '@expo/vector-icons';

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

const styles = StyleSheet.create({
  btnText: {
    textAlign: 'center',
    zIndex: 99999,
  },
  noPermissions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
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
  topBar: {
    flex: 0.2,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Constants.statusBarHeight / 2
  },
  bottomBar: {
    height: 80,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  bottomBarElements: {
    width: 50,
    height: 50
  },
  trigger: {
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderRadius: 50 / 2
  },
  camera: {
    flex: 1 
  }
});

class Scan extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    lastShotURI: "",
    flash: 'off',
    ratio: '16:9',
    newPhotos: false,
    pictureSize: undefined
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'photos'
    ).catch(e => {
      console.log(e, 'Directory exists');
    });
  }
  
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

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      console.log("Photo made: ", photo);
      this.setState({ lastShotURI: photo.uri });
      console.log("Photo made: ", this.state);
    }
  };

  accept = async () => {
   console.log('Accept: ', this.state.lastShotURI);
  };

  toggleFlash = () => { 
    this.setState({ flash: flashModeOrder[this.state.flash] });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return (
        <View style={styles.noPermissions}>
          <Text style={{ color: 'black' }}>
            Camera permissions not granted - cannot open camera preview.
          </Text>
        </View>
      );
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.toggleButton} onPress={this.toggleFlash}>
              <MaterialIcons
                name={flashIcons[this.state.flash]}
                size={32}
                color="white"
              />
            </TouchableOpacity>
          </View>          
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
            <PreviewShot accept={this.accept} lastShotURI={this.state.lastShotURI} />
            {/* TODO The View below is a hacky placeholder */}
            <View style={{ flex: 1 }} pointerEvents="none"/>
            <View style={styles.bottomBar}>
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
  componentDidMount = () => {
    console.log('#####', "mounted");
  }

  render() {
    return (
      <View
        style={{
          //zIndex: 99999,
          position: 'absolute',
          top: "10%",
          left: "10%",
          bottom: "10%",
          right: "10%",
          borderRadius: 10,
          backgroundColor: "rgba(255, 255, 55, 0.1)",
          opacity: .8,
          overflow: "hidden"
        }}
        >
        {this.props.lastShotURI ? (
            (
              <View style={{ position: 'relative', height: "90%" }} >
                <Image source={{ uri: this.props.lastShotURI }} style={{ flex: 1, backgroundColor: 'pink', zIndex: -1 }}/>
                { /*<View style={{ height: "10%", backgroundColor: 'white', zIndex: 999999999 }}>
                  <Text style={styles.btnText}>Accept</Text>
                </View>
                */}
                <TouchableOpacity style={{ height: "10%", backgroundColor: 'white'  }} onPress={this.props.accept}>
                  <Text style={styles.btnText}>Accept</Text>
                </TouchableOpacity>

              </View>
            )
        ) : (
          null
        )}
      </View>
    );
  }
}

export default Scan;
