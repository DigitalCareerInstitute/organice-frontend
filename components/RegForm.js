import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert
} from "react-native";
import SvgUri from "react-native-svg-uri";

export default class RegForm extends Component {
  state = {
    name: "phone",
    email: "phone@mail.com",
    password: "abc123"
  };

  onClickListener = viewId => {
    console.log("REGISTER FETCH");
    // console.log(this.state);
    fetch("http://172.16.130.195:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name.trim(),
        email: this.state.email.toLowerCase().trim(),
        password: this.state.password.trim()
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("#####", data);
        //TODO this should be AsycStorage
        // localStorage.setItem("token", data.token);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            defaultValue="phone"
            placeholder="name"
            keyboardType="default"
            onChangeText={name => this.setState({ name })}
          />
        </View>

        {/* <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="last Name"
            keyboardType="default"
            secureTextEntry="text"
            onChangeText={lastName => this.setState({ lastName })}
          />
        </View> */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            defaultValue="phone@mail.com"
            placeholder="email"
            keyboardType="email-address"
            // secureTextEntry={true}
            onChangeText={email => this.setState({ email })}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            defaultValue="abc123"
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          />
        </View>
        {/* <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="repeatPassword"
            secureTextEntry={true}
            onChangeText={repeatPassword => this.setState({ repeatPassword })}
          />
        </View> */}

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.onClickListener("register")}
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
    color: "#000",
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
