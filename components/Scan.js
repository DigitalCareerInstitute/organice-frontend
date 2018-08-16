import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Constants, Camera, Permissions, FileSystem } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import { DOMAIN } from "react-native-dotenv";
import { AsyncStorage } from "react-native";
import SvgUri from "react-native-svg-uri";
const test = require('../icons/git-cheat-sheet-large01.png')

const flashModeOrder = {
  off: "on",
  on: "auto",
  auto: "torch",
  torch: "off"
};

const flashIcons = {
  off: "flash-off",
  on: "flash-on",
  auto: "flash-auto",
  torch: "highlight"
};

const styles = StyleSheet.create({
  noPermissions: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
    letterSpacing: 1,
    backgroundColor: "#ff7539",
    textAlign: "center",
    padding: 7,
    borderRadius: 7,
    zIndex: 2
  },
  flashButton: {
    marginTop: 45,
    padding: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    height: '100%',
    zIndex: 0
  },
  scanBtn: {
    height: '85%',
    justifyContent: "flex-end",
    alignItems: "center",
  },
  preview: {
    position: "absolute",
    top: "0%",
    left: "0%",
    bottom: "0%",
    right: "0%",
    height: "100%",
    overflow: 'hidden'
  },
  imgContainer: {
    position: "relative",
    height: "100%"
  },
  savedImg: {
    flex: 1,
    backgroundColor: "#fff",
    zIndex: 99
  },
  savedImgBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

class Scan extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    lastShotURI: "",
    flash: "off",
    ratio: "16:9",
    newPhotos: false,
    pictureSize: undefined
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "photos"
    ).catch(e => {
      console.log(e, "Directory exists");
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
    let TOKEN = null
    try {
      TOKEN = await AsyncStorage.getItem("token");
    } catch (err) { console.log(err) }

    if (!TOKEN) {
      alert("not autenticated");
      //TODO redirect to login view if token is wrong or not set
      return;
    }
    var photo = {
      uri: this.state.lastShotURI,
      type: "image/jpeg",
      name: "photo.jpg"
    };
    var body = new FormData();
    body.append("date", Date.now());
    body.append("image", photo);
    body.append("title", Date.now());

    fetch(`http://${DOMAIN}:8080/api/scans/add`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${TOKEN}`
      }),
      body: body
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        alert(JSON.stringify(data.scan.recognizedText.text));
      })
      .catch(err => {
        console.log(err);
        alert(err);
      });
  };

  decline = async () => {
    console.log("decline");
    this.setState({ lastShotURI: null });
  };

  toggleFlash = () => {
    this.setState({ flash: flashModeOrder[this.state.flash] });
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return (
        <View style={styles.noPermissions}>
          <Text style={{ color: "#fff" }}>
            Camera permissions not granted - cannot open camera preview.
          </Text>
        </View>
      );
    } else if (hasCameraPermission === false) {
      return <Text>Please allow access to the camera</Text>;
    } else {
      return (
        <View style={styles.cameraContainer}>
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
            <TouchableOpacity
              style={styles.flashButton}
              onPress={this.toggleFlash}
            >
              <MaterialIcons
                name={flashIcons[this.state.flash]}
                size={32}
                color="#ff7539"
              />
            </TouchableOpacity>
            <PreviewShot
              accept={this.accept}
              decline={this.decline}
              lastShotURI={this.state.lastShotURI}
            />
            <View style={styles.scanBtn}>
              <Trigger snap={this.snap} />
            </View>
          </Camera>
        </View>
      );
    }
  }
}


class Trigger extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.snap}>
        <SvgUri width={55} height={55} source={require('../icons/camera.svg')} />
      </TouchableOpacity>
    );
  }
}

class PreviewShot extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    console.log("#####", "mounted");
  };

  render() {
    return (
      <View style={styles.preview}>
        {this.props.lastShotURI ? (
          <View style={styles.imgContainer}>
            <Image
              source={{ uri: this.props.lastShotURI }}
              style={styles.savedImg}
            />
            <View style={styles.savedImgBtn}>
              <TouchableOpacity
                style={{
                  padding: 5,
                  marginLeft: 45
                }}
                onPress={this.props.decline}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 5,
                  marginRight: 55
                }}
                onPress={this.props.accept}
              >
                <Text style={styles.btnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

export default Scan;
