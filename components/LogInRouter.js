import React from "react";
import { createStackNavigator } from "react-navigation";
import RegForm from "./RegForm";
import LogInForm from "./LogInForm";

class LogInRouter extends React.Component {
  Navigator = createStackNavigator(
    {
      login: {
        screen: LogInForm,
        title: "Log In",
        navigationOptions: () => ({
          header: null
        })
      },
      register: {
        screen: RegForm,
        navigationOptions: () => ({
          headerTitle: "Register",
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
  render() {
    return (
      <this.Navigator
        screenProps={{
          loginUser: this.props.loginUser,
          registerNewUser: this.props.registerNewUser
        }}
      />
    );
  }
}

export default LogInRouter;
