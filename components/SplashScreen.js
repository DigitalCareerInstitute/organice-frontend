import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import SvgUri from "react-native-svg-uri";

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#f9f9f9"
  }
});

class SplashScreen extends React.Component {
  render() {
    return (
      <View style={styles.loadingScreen}>
        <SvgUri
          width="200"
          height="200"
          source={require("../icons/logo.svg")}
        />
        <ActivityIndicator size="large" color="#FF7539" />
      </View>
    );
  }
}

export default SplashScreen;
