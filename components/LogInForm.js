import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage
} from "react-native";

const styles = StyleSheet.create({
  regForm: {
    alignSelf: "stretch",
    justifyContent: "center"
  },
  header: {
    fontSize: 20,
    color: "#fff",
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: "#199187",
    borderBottomWidth: 1
  },
  textInput: {
    alignSelf: "stretch",
    height: 40,
    marginBottom: 30,
    color: "black",
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 1
  },
  button: {
    alignSelf: "stretch",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#0fa1ff",
    marginTop: 30
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold"
  }
});

class LogInForm extends React.Component {
  submit = async e => {
    // hard coded for now
    console.log("hii");
    const user = {
      email: "osama@example.com",
      password: "osama"
    };
    // this.setState(state => {
    //   state.user = user;
    //   return state;
    // });

    this.props.loginUser(user);
  };

  render() {
    return (
      <View style={styles.regForm}>
        <Text style={styles.header}>Log In</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Your Email"
          underlineColorAndroid={"transparent"}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your Password"
          underlineColorAndroid={"transparent"}
        />
        <Button
          style={styles.button}
          onPress={e => this.submit(e)}
          title="Login"
          color="#841584"
          accessibilityLabel="Log in to Organice"
        />
      </View>
    );
  }
}

export default LogInForm;
