import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import List from './ListView';
// import Photo from './Photo';
// import GalleryScreen from './GalleryScreen';
import Settings from './Settings';
import Scan from './Scan';
import { Icon } from 'react-native-elements';

Footer = createBottomTabNavigator({
	List: {
		screen: List,
		navigationOptions: {
			tabBarLabel: 'List',
			atabBarIcon: <Icon name="list" size={35} color="#ff3d00" />
		}
	},
	Scan: {
		screen: Scan,
		navigationOptions: {
			tabBarLabel: 'Scan',
			tabBarIcon: <Icon name="camera" size={35} color="#ff3d00" />
		}
	},
	Settings: {
		screen: Settings,
		navigationOptions: {
			tabBarLabel: 'Settings',
			tabBarIcon: <Icon name="settings" size={35} color="#ff3d00" />
		}
	}
	// Photo: {
	// 	screen: Photo,
	// 	navigationOptions: {
	// 		tabBarLabel: 'Photo',
	// 		tabBarIcon: <Icon name="Photo" size={35} color="#ff3d00" />
	// 	}
	// }
	// GalleryScreen: {
	// 	screen: GalleryScreen,
	// 	navigationOptions: {
	// 		tabBarLabel: 'GalleryScreen',
	// 		tabBarIcon: <Icon name="GalleryScreen" size={35} color="#ff3d00" />
	// 	}
	// }
});

export default Footer;
