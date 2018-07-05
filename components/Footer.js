import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

export class Footer extends React.Component {
  render() {
    const Tabs = TabNavigator({
      Settings: {
        screen: SettingsStack,
        navigationOptions: {
          tabBarLabel: 'Settings',
          tabBarIcon: <Icon name="account-circle" size={35} color='red' />,
        },
      },
      List: {
        screen: List,
        navigationOptions: {
          tabBarLabel: 'List',
          tabBarIcon: <Icon name="list" size={35} color='red' />
        },
      },
    })
  }
}