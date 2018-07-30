import React from "react";
import { DOMAIN, TOKEN } from 'react-native-dotenv'
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scans: {},
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
    setTimeout(() => {
      this.hideSplashScreen();
    }, 1000);
    this.getScans();
  }

  getScans = () => {
    //10.0.2.2
    fetch(`http://${DOMAIN}:8080/api/scans`, {
      method: "get",
      headers: {
        "Authorization": TOKEN
      }
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
      .catch(err => console.error(err));
  };

  render() {
    return this.state.loading ? <SplashScreen /> : <Footer />;
  }
}

export default App;
