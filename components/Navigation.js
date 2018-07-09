import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput
} from "react-native";
import { Button, View } from "react-native";
import RegForm from "./components/RegForm";
import LogInForm from "./components/LogInForm";
import { createSwitchNavigator } from "react-navigation";

class App extends React.Component {
  render() {
    return <MyNavigator />;
  }
}

class ScreenComponentOne extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          borderWidth: 25,
          borderColor: "teal"
        }}
      >
        <RegForm />
      </View>
    );
  }
}

class ScreenComponentTwo extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          borderWidth: 25,
          borderColor: "orange"
        }}
      >
        <LogInForm />
      </View>
    );
  }
}

class ScreenComponentThree extends React.Component {
  render() {
    let greeting = this.props.navigation.getParam("greeting", "Hi");

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          borderWidth: 25,
          borderColor: "purple"
        }}
      >
        <Button
          title={`${greeting}! Go to one`}
          onPress={() => this.props.navigation.navigate("routeNameOne")}
        />
      </View>
    );
  }
}

const MyNavigator = createSwitchNavigator({
  routeNameOne: ScreenComponentOne,
  routeNameTwo: ScreenComponentTwo,
  routeNameThree: ScreenComponentThree
});

export default App;
