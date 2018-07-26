import React from "react";
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
    fetch(`http://"your IP addrs":8080/api/scans`, {
      method: "get",
      headers: {
        Authorization: "Bearer 'put a user token here'"
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
