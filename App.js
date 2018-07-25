import React from "react";
import axios from "axios";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
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
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9zYW1hQGV4YW1wbGUuY29tIiwiaWQiOiI1YjU3MjRjZDM4NWE4YjBiMzkwMTUyODkiLCJpYXQiOjE1MzI0Mzc5NjEsImV4cCI6MTU2Mzk3Mzk2MX0.eF75GChYGhPDTMP1rNLQObBx1z8O4afMONAH_cHzFOY"
    );
    //10.0.2.2
    fetch(`http://172.16.137.115:8080/api/scans`, {
      method: "get",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(res => {
        const data = res;
        console.log(data);
        this.setState(state => {
          state.data = data;
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
