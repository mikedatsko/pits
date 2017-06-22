import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { App } from './src';

export default class Pits extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
      }}>
        <App/>
      </View>
    );
  }
}

AppRegistry.registerComponent('Pits', () => Pits);
