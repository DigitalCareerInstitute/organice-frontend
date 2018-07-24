import React, { Component } from "react";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert
} from "react-native";
import SvgUri from "react-native-svg-uri";

export default class LogInForm extends Component {
  state = {
    email: "mouaz@mail.com",
    password: "abc123"
  };

  onClickListener = viewId => {
    console.log("FETCH");
    fetch("http://172.16.130.195:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email.toLowerCase().trim(),
        password: this.state.password.trim()
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("#####", data);
        // console.log(data.user.token);
        //TODO this should be AsycStorage
        // async.setItem("token", data.user.token);

          try {
            await AsyncStorage.setItem("token", data.user.token);
          } catch (error) {
            console.log(error);
          }


      })
      .catch(err => {
        console.log(err);
      });
  };
  navigate = viewId => {
    console.log("nav");
  };
  render() {
    return (
      <View style={styles.container}>
        <SvgUri
          width="120"
          height="120"
          source={require("../icons/logo.svg")}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="email"
            defaultValue="mouaz@mail.com"
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            defaultValue="abc123"
            placeholder="password"
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.onClickListener("login")}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.passText]}
          onPress={() => this.navigate("restore_password")}
        >
          <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.regText]}
          onPress={() => this.navigate("register")}
        >
          <Text>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    borderBottomColor: "#000",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    flex: 1,
    alignSelf: "stretch",
    height: 40,
    color: "#333",
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 1
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
    width: 250
  },
  loginButton: {
    backgroundColor: "#ff7539"
  },
  loginText: {
    color: "white"
  }
});
