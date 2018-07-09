import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import List from "./ListView";
import Settings from "./Settings";
import Scan from "./Scan";
import { Icon } from "react-native-elements";

Footer = createBottomTabNavigator({
  List: {
    screen: List,
    navigationOptions: {
      tabBarLabel: "List",
      tabBarIcon: <Icon name="list" size={35} color="#ff3d00" />
    }
  },
  Scan: {
    screen: Scan,
    navigationOptions: {
      tabBarLabel: "Scan",
      tabBarIcon: <Icon name="camera" size={35} color="#ff3d00" />
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: "Settings",
      tabBarIcon: <Icon name="settings" size={35} color="#ff3d00" />
    }
  }
});

export default Footer;
