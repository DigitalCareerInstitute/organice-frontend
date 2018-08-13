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
      userData: {},
      noToken: true,
      loading: true
    };
  }

  componentWillMount() {
    this.checkIfTokenExists();
    this.checkIfUserDataExists();
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

  checkIfUserDataExists = async () => {
    try {
      const name = await AsyncStorage.getItem("userName");
      const email = await AsyncStorage.getItem("userEmail");
      const userData = { name, email }
      if (userData !== null) {
        this.setState(state => {
          state.userData = userData;
          return state;
        });
      } else {
        console.log('No user Data', userData)
        this.setState(state => {
          state.noToken = true;
          return state;
        });
      }
    } catch (err) {
      console.error(error.message);
    }
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
        this.setState(state => {
          state.noToken = true;
          return state;
        });
      }
    } catch (err) {
      console.error(error.message);
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
      console.log(error.message);
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
        const userData = { email: res.user.email, name: res.user.name }
        this.getUserData(userData)
        this.clearToken("token");
        this.setToken(res.user.token);
        this.getScans(res.user.token);
        this.checkIfTokenExists();
      })
      .catch(err => console.error(err.message));
  };

  logoutUser = () => {
    this.clearToken("token");
    this.checkIfTokenExists();
  };

  getUserData = async (data) => {
    if (data) {
      try {
        await AsyncStorage.setItem("userName", data.name);
        await AsyncStorage.setItem("userEmail", data.email);
      } catch (err) { console.error(err) }
      this.setState(state => {
        state.userData = data
        return state
      })
    }
  }

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
        const userData = { email: res.user.email, name: res.user.name }
        this.getUserData(userData)
        this.setToken(res.user.token);
        this.getScans(res.user.token);
        this.checkIfTokenExists();
      })
      .catch(err => console.error(err.message));
  };

  deleteUser = async () => {
    let token = null;
    try {
      token = await AsyncStorage.getItem("token");
    } catch (err) {
      console.error(error.message);
    }
    fetch(`http://${DOMAIN}:8080/api/users/delete`, {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      })
    })
      .then(res => {
        this.clearToken("token");
        this.checkIfTokenExists();
      })
      .catch(err => console.error(err.message));
  };

  changePassword = async (passwords) => {
    fetch(`http://${DOMAIN}:8080/api/login`, {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        email: `${this.state.userData.email}`,
        password: `${passwords.oldPassword}`
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.user !== false) {
          this.saveNewPassword(passwords.newPassword)
        } else {
          alert('you entered a wrong password')
        }
      })
      .catch(err => console.error(err.message));

  }

  saveNewPassword = async newPassword => {
    let token = null;
    try {
      token = await AsyncStorage.getItem("token");
    } catch (err) {
      console.error(error.message);
    }
    fetch(`http://${DOMAIN}:8080/api/users/updatepassword`, {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }),
      body: JSON.stringify({
        password: `${newPassword}`
      })
    })
      .then(res => res.json())
      .then(res => {
        this.clearToken("token");
        this.setToken(res.user.token);
        this.checkIfTokenExists();
        console.log('Password Changed to: ', newPassword)
      })
      .catch(err => console.error(err.message));
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
        this.setState(state => {
          state.scans = data;
          state.loading = false;
          return state;
        });
      })
      .catch(err => console.log(err.message));
  };

  render() {
    return this.state.loading ? (
      <SplashScreen />
    ) : (
        <PublicNavs
          noToken={this.state.noToken}
          userData={this.state.userData}
          loginUser={this.loginUser}
          registerNewUser={this.registerNewUser}
          logoutUser={this.logoutUser}
          changePassword={this.changePassword}
          deleteUser={this.deleteUser}
          scans={this.state.scans}
        />
      );
  }
}

export default App;
