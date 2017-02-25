/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
// import * as MyComp from './acce';

// import { Accelerometer, Gyroscope } from 'react-native-sensors';
// const accelerationObservable = new Accelerometer({
//   updateInterval: 100, // defaults to 100ms 
// });
 
// // Normal RxJS functions 
// accelerationObservable
//   .map(({ x, y, z }) => x + y + z)
//   .filter(speed => speed > 20)
//   .subscribe(speed => console.log(`You moved your phone with ${speed}`));
 
// setTimeout(() => {
//   accelerationObservable.stop();
// }, 1000);

export default class Pits extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Pits App
        </Text>
        
        <Text style={styles.instructions}>
          Determine all the pits on the road!!!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Pits', () => Pits);
