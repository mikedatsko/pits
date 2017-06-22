import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  Image
} from 'react-native';

const winWidth = Dimensions.get('window').width; //full width
const winHeight = Dimensions.get('window').height; //full height
let menuPos = 0;

export class App extends Component {
  state = {
    menuPos: -winWidth
  };

  constructor() {
    super();
  }

  openMenu() {
    this.setState({menuPos: 0});
  }

  closeMenu() {
    this.setState({menuPos: -winWidth});
  }

  render() {
    return (
      <View style={{
        position: 'absolute',
        backgroundColor: '#666666',
        width: winWidth,
        height: winHeight,
        left: 0,
        top: 0
      }}>
        <Text style={styles.welcome}>
          <Text style={{fontWeight: 'bold'}}>PITS</Text>
        </Text>

        <TouchableHighlight onPress={e => {this.closeMenu(e)}} style={{
          left: 5,
          top: 5,
          width: 40,
          height: 40,
          marginBottom: 10,
          backgroundColor: '#999999',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute'
        }}>
          <Text>Play</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={e => {this.closeMenu(e)}} style={{
          left: 50,
          top: 5,
          width: 40,
          height: 40,
          marginBottom: 10,
          backgroundColor: '#999999',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute'
        }}>
          <Text>Play</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
