import React from "react";
import PublicNavs from "./components/PublicNavs";
import SplashScreen from "./components/SplashScreen";
import { AsyncStorage } from "react-native";
import { DOMAIN } from "react-native-dotenv";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scans: {},
      noToken: true,
      loading: true
    };
  }

  componentWillMount() {
    // this.checkIfTokenExists();
  }

  componentDidMount() {
    setTimeout(() => {
      this.hideSplashScreen();
    }, 500);
  }

  hideSplashScreen = () => {
    this.setState(state => {
      state.loading = false;
      return state;
    });
  };

  checkIfTokenExists = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token !== null) {
        this.setState(state => {
          state.noToken = false;
          return state;
        });
      } else {
        console.log("No token", token);
      }
    } catch (err) {
      console.error(err);
    }
  };

  setToken = async token => {
    try {
      const TOKEN = await AsyncStorage.setItem("token", token);
      return TOKEN;
    } catch (error) {
      console.log(error.message);
    }
  };

  clearToken = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  };

  loginUser = async user => {
    fetch(`http://${DOMAIN}:8080/api/login`, {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        email: `${user.email}`,
        password: `${user.password}`
      })
    })
      .then(res => res.json())
      .then(res => {
        this.clearToken("token");
        this.setToken(res.user.token);
        this.getScans(res.user.token);
        this.checkIfTokenExists();
      })
      .catch(err => console.error(err));
  };

  registerNewUser = async data => {
    fetch(`http://${DOMAIN}:8080/api/register`, {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        name: `${data.name}`,
        email: `${data.email}`,
        password: `${data.password}`
      })
    })
      .then(res => res.json())
      .then(res => {
        this.setToken(res.user.token);
        this.getScans(res.user.token);
        this.checkIfTokenExists();
      })
      .catch(err => console.error(err));
  };

  getScans = async token => {
    fetch(`http://${DOMAIN}:8080/api/scans`, {
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      })
    })
      .then(res => res.json())
      .then(res => {
        const data = res;
        console.log(data);
        this.setState(state => {
          state.scans = data;
          state.loading = false;
          return state;
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return this.state.loading ? (
      <SplashScreen />
    ) : (
      <PublicNavs
        noToken={this.state.noToken}
        loginUser={this.loginUser}
        registerNewUser={this.registerNewUser}
      />
    );
  }
}

export default App;
