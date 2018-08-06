import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Constants, Camera, Permissions, FileSystem,} from "expo";
import { MaterialIcons } from '@expo/vector-icons';
import { DOMAIN } from "react-native-dotenv";
import { AsyncStorage } from "react-native";
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
    color: 'white',
    textAlign: 'center',
    zIndex: 99999,
  },
  preview: {
    //zIndex: 99999,
    position: 'absolute',
    top: "0%",
    left: "10%",
    bottom: "20%",
    right: "10%",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 55, 0.4)",
    opacity: .8,
    overflow: "hidden"
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
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Constants.statusBarHeight / 4
  },
  bottomBar: {
    height: 60,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  bottomBarElements: {
    height: 40
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
      this.setState({ lastShotURI: photo.uri });
    }
  };

  accept = async () => {
    //// Manually set a valid token with: 
    // await AsyncStorage.setItem("token", "YOUR.TOKEN.HERE");
    const TOKEN = await AsyncStorage.getItem("token");
    
    if(!TOKEN){
      alert("not autenticated")
      //TODO redirect to login view if token is wrong or not set
      return;
    }
    var photo = {
      uri: this.state.lastShotURI,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };

    var body = new FormData();
    body.append('date', Date.now());
    body.append('image', photo);
    body.append('title', Date.now());

    fetch(`http://${DOMAIN}:8080/api/scans/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`
      },
      body: body
    })
      .then(res => res.json())
      .then(data => {
        alert(JSON.stringify(data.scan.recognizedText.text))
      })
      .catch(err => {
        console.log(err);
        alert(err)
      });
  };

  decline = async () => {
   console.log('decline');
   this.setState({lastShotURI: null})
  };

  toggleFlash = () => { 
    this.setState({ flash: flashModeOrder[this.state.flash] });
  };

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
            <PreviewShot accept={this.accept} decline={this.decline} lastShotURI={this.state.lastShotURI} />
            {/* TODO This is pretty hacky */}
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
        style={styles.preview}
        >
        {this.props.lastShotURI ? (
            (
              <View style={{ position: 'relative', height: "100%" }} >
                <Image source={{ uri: this.props.lastShotURI }} style={{ flex: 6, backgroundColor: 'pink', zIndex: -1 }}/>
                { /*<View style={{ height: "10%", backgroundColor: 'white', zIndex: 999999999 }}>
                  <Text style={styles.btnText}>Accept</Text>
                </View>
                */}
                <View style={{ flex: 1, flexDirection: "row",  display: 'flex'}}>
                  <TouchableOpacity style={{ flex: 1, padding: 10, height: "50%", backgroundColor: "rgba(255, 255, 55, 0.1)"  }} onPress={this.props.decline}>
                    <Text style={styles.btnText}>Take another</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, padding: 10, height: "50%", backgroundColor: "rgba(255, 255, 55, 0.1)"  }} onPress={this.props.accept}>
                    <Text style={styles.btnText}>Accept</Text>
                  </TouchableOpacity>

                  </View>
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
