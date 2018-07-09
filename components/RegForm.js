import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput
} from "react-native";

class RegForm extends React.Component {
  render() {
    return (
      <View style={styles.regForm}>
        <Text style={styles.header}>Please Register</Text>
        <TextInput
          style={styles.textInput}
          placeholder="First Name"
          underlineColorAndroid={"transparent"}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          underlineColorAndroid={"transparent"}
        />
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
        <TouchableOpacity
          onPress={() => navigate("Home")}
          style={styles.button}
        >
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  regForm: {
    alignSelf: "stretch"
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
    color: "#fff",
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

export default RegForm;
