import React from "react";
import { createStackNavigator } from "react-navigation";
import PrivateNavs from "./PrivateNavs";
import LogInRouter from "./LogInRouter";

class PublicNavs extends React.Component {
  // !this.props.noToken ? (
  //   <LogInRouter loginUser={this.props.loginUser} />
  // ) : (
  //   <PrivateNavs />
  // );
  render() {
    return this.props.noToken ? (
      <LogInRouter loginUser={this.props.loginUser} />
    ) : (
      <PrivateNavs loginUser={this.props.loginUser} />
    );
  }
}

export default PublicNavs;
