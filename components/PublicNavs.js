import React from "react";
import PrivateNavs from "./PrivateNavs";
import LogInRouter from "./LogInRouter";

class PublicNavs extends React.Component {
  render() {
    return this.props.noToken ? (
      <LogInRouter
        loginUser={this.props.loginUser}
        registerNewUser={this.props.registerNewUser}
      />
    ) : (
        <PrivateNavs screenProps={{ scans: this.props.scans }} />
      );
  }
}

export default PublicNavs;
