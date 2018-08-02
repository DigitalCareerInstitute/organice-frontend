import React from "react";
import PublicNavs from "./components/PublicNavs";
import SplashScreen from "./components/SplashScreen";
import { AsyncStorage } from "react-native";
import { DOMAIN, TOKEN } from "react-native-dotenv";

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
    // leave the function commented / for Development mode
    // this.checkToken();
  }

  componentDidMount() {
    // this.getScans();
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

  checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token !== null) {
        console.log(token);
        this.setState(state => {
          state.noToken = false;
          return state;
        });
      } else {
        console.log(token);
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

  removeToken = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  };

  loginUser = async user => {
    //10.0.2.2
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
        this.removeToken("token");
        this.setToken(res.user.token);
        this.getScans(res.user.token);
        this.checkToken();
      })
      .catch(err => console.error(err));
  };

  getScans = async token => {
    //10.0.2.2
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
      <PublicNavs noToken={this.state.noToken} loginUser={this.loginUser} />
    );
  }
}

export default App;
