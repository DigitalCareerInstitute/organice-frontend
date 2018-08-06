import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput
} from "react-native";
import SvgUri from "react-native-svg-uri";

const styles = StyleSheet.create({
  regForm: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: "#fff"
  },
  textInput: {
    flexDirection: "row",
    alignSelf: "stretch",
    padding: 10,
    margin: 10,
    marginTop: 15,
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
  policyTxt: {
    fontSize: 12,
    color: "#6c6c6c",
    letterSpacing: 1.3
  }
});

class RegForm extends React.Component {
  name = React.createRef();
  email = React.createRef();
  password = React.createRef();

  submit = () => {
    const data = {
      name: this.name,
      email: this.email,
      password: this.password
    };
    this.props.screenProps.registerNewUser(data);
  };

  render() {
    return (
      <View style={styles.regForm}>
        <SvgUri
          width="150"
          height="150"
          source={require("../icons/logo.svg")}
        />
        <TextInput
          style={styles.textInput}
          ref={this.name}
          placeholder="Your Name"
          underlineColorAndroid={"transparent"}
          onChangeText={e => (this.name = e)}
        />
        <TextInput
          style={styles.textInput}
          ref={this.email}
          placeholder="Email"
          textContentType="emailAddress"
          keyboardType="email-address"
          underlineColorAndroid={"transparent"}
          onChangeText={e => (this.email = e)}
        />
        <TextInput
          style={styles.textInput}
          ref={this.password}
          placeholder="Password"
          textContentType="password"
          placeholder="Password"
          underlineColorAndroid={"transparent"}
          secureTextEntry={true}
          selectTextOnFocus={true}
          onChangeText={e => (this.password = e)}
        />
        <Text style={styles.policyTxt}>
          By signing up you accept our privacy policy
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => this.submit()}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default RegForm;
