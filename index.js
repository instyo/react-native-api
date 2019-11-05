import { AppRegistry } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
AppRegistry.registerComponent(appName, () => App);

// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
