import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import SvgUri from "react-native-svg-uri";
import { Icon } from "react-native-elements";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10
  },
  avatar: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 2,
    paddingTop: 5,
    paddingBottom: 15,
    marginTop: 45
    // borderBottomWidth: 0.8,
    // borderStyle: "solid",
    // borderColor: "black"
  },
  avatarName: {
    fontSize: 20,
    letterSpacing: 2
  },
  avatarEmail: {
    fontSize: 13,
    color: "#6c6c6c",
    marginTop: 7,
    letterSpacing: 2
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    padding: 4,
    margin: 5,
    marginTop: 35,
    borderStyle: "solid",
    borderColor: "black",
    borderBottomWidth: 0.4
  },
  btnText: {
    letterSpacing: 1,
    color: "#ff7539"
  },
  logOutBtn: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "center",
    padding: 4,
    margin: 5,
    marginTop: 45
  }
});

class Settings extends React.Component {
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.avatar}>
          <View>
            <Text style={styles.avatarName}>Peter Parker</Text>
            <Text style={styles.avatarEmail}>PeterParker@mail.com</Text>
          </View>
          <SvgUri
            width="60"
            height="60"
            source={require("../icons/logo_final_no_text.svg")}
          />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}>Change Password</Text>
          <Icon name="key" type="font-awesome" color="#ff7539" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}>Space Used</Text>
          <Icon name="bar-chart" type="font-awesome" color="#ff7539" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}>Privacy policy</Text>
          <Icon name="file-text-o" type="font-awesome" color="#ff7539" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logOutBtn}>
          <Text style={styles.btnText}>Log out</Text>
          <Icon
            containerStyle={{ marginLeft: 8 }}
            name="sign-in"
            type="font-awesome"
            color="#ff7539"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Settings;
