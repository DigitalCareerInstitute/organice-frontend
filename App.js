import React from "react";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  render() {
    return this.state.loading ? <SplashScreen /> : <Footer />;
  }
}

export default App;
