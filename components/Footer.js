import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import List from "./ListView";
import Settings from "./Settings";
import Scan from "./Scan";
import SvgUri from "react-native-svg-uri";

Footer = createBottomTabNavigator(
  {
    list: List,
    scan: Scan,
    settings: Settings
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        let routeName = navigation.state.routeName;
        let iconPath;
        let size = null;

        if (routeName === "settings") {
          if (navigation.isFocused()) {
            iconPath = require("../icons/settings.svg");
            size = 45;
          } else {
            iconPath = require("../icons/settings.1.svg");
            size = 45;
          }
        }
        if (routeName === "scan") {
          if (navigation.isFocused()) {
            iconPath = require("../icons/scan.1.svg");
            size = 65;
          } else {
            iconPath = require("../icons/scan.svg");
            size = 65;
          }
        }
        if (routeName === "list") {
          if (navigation.isFocused()) {
            iconPath = require("../icons/list.svg");
            size = 45;
          } else {
            iconPath = require("../icons/list.1.svg");
            size = 45;
          }
        }
        
        return <SvgUri width={size} height={size} source={iconPath} />;
      }
    }),
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: "#212121",
        height: 65
      }
    }
  }
);

export default Footer;
