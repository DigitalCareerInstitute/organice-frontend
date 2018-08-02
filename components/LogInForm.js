import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import SvgUri from "react-native-svg-uri";

const styles = StyleSheet.create({
  loginForm: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: "#fff"
  },
  inputText: {
    flexDirection: "row",
    alignSelf: "stretch",
    padding: 12,
    margin: 10,
    marginTop: 30,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 0.6,
    letterSpacing: 1,
    color: "#ff7539"
  },
  button: {
    alignSelf: "stretch",
    alignItems: "center",
    margin: 10,
    marginTop: 35,
    padding: 20,
    backgroundColor: "#ff7539"
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1.3
  },
  regText: {
    margin: 10,
    marginTop: 10,
    color: "#6c6c6c",
    letterSpacing: 1.3
  },
  regLink: {
    color: "#ff7539"
  }
});

class LogInForm extends React.Component {
  email = React.createRef();
  password = React.createRef();

  submit = () => {
    const user = {
      email: this.email,
      password: this.password
    };

    this.props.screenProps.loginUser(user);
  };

  render() {
    return (
      <View style={styles.loginForm}>
        <SvgUri
          width="170"
          height="170"
          source={require("../icons/logo.svg")}
        />
        <TextInput
          style={styles.inputText}
          ref={this.email}
          textContentType="emailAddress"
          keyboardType="email-address"
          placeholder="Your Email"
          underlineColorAndroid="transparent"
          selectTextOnFocus={true}
          onChangeText={e => (this.email = e)}
        />
        <TextInput
          style={styles.inputText}
          ref={this.password}
          textContentType="password"
          placeholder="Your Password"
          underlineColorAndroid="transparent"
          secureTextEntry={true}
          selectTextOnFocus={true}
          onChangeText={e => (this.password = e)}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.submit()}>
          <Text style={styles.btnText}>Log In</Text>
        </TouchableOpacity>

        <Text style={styles.regText}>
          New to Organice?{" "}
          <Text
            style={styles.regLink}
            onPress={() => this.props.navigation.navigate("register")}
          >
            Register Now
          </Text>
        </Text>
      </View>
    );
  }
}

export default LogInForm;
