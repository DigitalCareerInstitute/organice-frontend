import React from 'react';	
import { createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import List from './components/ListView'
import Settings from './components/Settings'

const Tabs = createBottomTabNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: <Icon name="settings" size={35} color='red' />
    },
	},
	List: {
    screen: List,
    navigationOptions: {
      tabBarLabel: 'List',
      tabBarIcon: <Icon name="list" size={35} color='red' />
    },
  },
});

	
export default class App extends React.Component {	
	render() {	
		return <Tabs />;	
	}	
}
