import React from "react";
import PrivateNavs from "./components/PrivateNavs";
import SplashScreen from "./components/SplashScreen";
import { AsyncStorage } from "react-native";
import LogInForm from "./components/LogInForm";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scans: {},
      token: false,
      loading: true
    };
  }

  hideSplashScreen = () => {
    this.setState(state => {
      state.loading = false;
      return state;
    });
  };

  componentDidMount() {
    try {
      user2 = await AsyncStorage.getItem("token");
      console.log(user2);
      return user2;
    } catch (error) {
      console.log(error.message);
    }
    // this.getScans();
    setTimeout(() => {
      this.hideSplashScreen();
    }, 1000);
  }

  // componentWillMount() {
  //   // TODO Get AsyncStorage token
  
  // }

  loginUser = async user => {
    // let user = null;
    console.log(user);
    
    //10.0.2.2
    fetch(`http://172.16.137.115:8080/api/login`, {
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
        const userData = res;
        console.log(userData);
        //TODO AsyncStorage.setItem("token", res.user.token)
        return userData;
      })
      .catch(err => console.error(err));
  };

  getScans = () => {
    //10.0.2.2
    fetch(`http://172.16.137.115:8080/api/scans`, {
      method: "get",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhYUBleGFtcGxlLmNvbSIsImlkIjoiNWI1ZWNjMmVlNTQwMDkyMWIzZjg1MjE3IiwiaWF0IjoxNTMyOTM5MzEwLCJleHAiOjE1MzMxMTIxMTB9.PSgQXIJ_Yn0WYy_or7YdYSmqyAL51FtDS2vhaTvJpow"
      }
    })
      .then(res => res.json())
      .then(res => {
        const data = res;
        // console.log(data);
        this.setState(state => {
          state.scans = data;
          state.loading = false;
          return state;
        });
      })
      .catch(err => console.error(err));
  };

  render() {
    return this.state.loading ? (
      <SplashScreen />
    ) : (
      <LogInForm loginUser={this.loginUser} />
    );
  }
}

export default App;
