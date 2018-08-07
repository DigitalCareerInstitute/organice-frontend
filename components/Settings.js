import React from "react";
import { createStackNavigator } from "react-navigation";
import SvgUri from "react-native-svg-uri";
import { Icon } from "react-native-elements";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10
  },
  changePassword: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
    paddingTop: 30
  },
  avatar: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 2,
    paddingTop: 5,
    paddingBottom: 15,
    marginTop: 45
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
  deleteText: {
    letterSpacing: 1,
    color: "#E82C0C"
  },
  logOutBtn: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "center",
    padding: 4,
    margin: 5,
    marginTop: 55
  },
  input: {
    flexDirection: "row",
    alignSelf: "stretch",
    padding: 8,
    margin: 5,
    marginTop: 40,
    borderStyle: "solid",
    borderColor: "black",
    borderBottomWidth: 0.4,
    borderTopWidth: 0.4,
    letterSpacing: 1,
    color: "#ff7539"
  },
  passwordBtn: {
    justifyContent: "center",
    alignSelf: "stretch",
    padding: 10,
    margin: 5,
    marginTop: 65,
    backgroundColor: "#ff7539"
  },
  passwordTxt: {
    letterSpacing: 1,
    color: "#f9f9f9",
    textAlign: "center"
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("password")}
        >
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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.deleteText}>Delete Account</Text>
          <Icon name="times" type="font-awesome" color="#E82C0C" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logOutBtn}
          onPress={() => this.props.screenProps.logoutUser()}
        >
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

class ChangePassword extends React.Component {
  password = React.createRef();
  newPass = React.createRef();
  reNewPass = React.createRef();

  submit = () => {
    if (this.newPass === this.reNewPass) {
      this.props.screenProps.changePassword(this.newPass);
    }
  };

  render() {
    return (
      <View style={styles.changePassword}>
        <TextInput
          ref={this.password}
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholderTextColor="#484848"
          placeholder="Enter password"
          textContentType="password"
          selectTextOnFocus={true}
          secureTextEntry={true}
          onChangeText={e => (this.password = e)}
        />
        <TextInput
          ref={this.newPass}
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholderTextColor="#484848"
          placeholder="Enter new password"
          textContentType="password"
          selectTextOnFocus={true}
          secureTextEntry={true}
          onChangeText={e => (this.newPass = e)}
        />
        <TextInput
          ref={this.reNewPass}
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholderTextColor="#484848"
          placeholder="re-enter new Password"
          textContentType="password"
          selectTextOnFocus={true}
          secureTextEntry={true}
          onChangeText={e => (this.reNewPass = e)}
        />
        <TouchableOpacity
          style={styles.passwordBtn}
          onPress={() => this.submit()}
        >
          <Text style={styles.passwordTxt}>RESET PASSWORD</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const settingsNavigator = createStackNavigator(
  {
    settings: {
      screen: Settings,
      title: "Settings",
      navigationOptions: () => ({
        header: null
      })
    },
    password: {
      screen: ChangePassword,
      navigationOptions: () => ({
        headerTitle: "Change Password",
        headerStyle: { backgroundColor: "#ff7539" },
        headerTitleStyle: { color: "#f9f9f9" },
        headerTintColor: "#f9f9f9"
      })
    }
  },
  {
    headerMode: "float"
  }
);

export default settingsNavigator;
