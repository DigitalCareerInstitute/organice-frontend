import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import List from './components/ListView';
import Settings from './components/Settings';
import Scan from './components/Scan';

const Tabs = createBottomTabNavigator({
	Settings: {
		screen: Settings,
		navigationOptions: {
			tabBarLabel: 'Settings',
			tabBarIcon: <Icon name="settings" size={35} color="#ff3d00" />
		}
	},
	List: {
		screen: List,
		navigationOptions: {
			tabBarLabel: 'List',
			tabBarIcon: <Icon name="list" size={35} color="#ff3d00" />
		}
	},
	Scan: {
		screen: Scan,
		navigationOptions: {
			tabBarLabel: 'Scan',
			tabBarIcon: <Icon name="photo_camera" size={35} color="#ff3d00" />
		}
	}
});

export default class App extends React.Component {
	render() {
		return <Tabs />;
	}
}
