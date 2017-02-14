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
  View,
} from 'react-native'

import StepIndicator from 'react-native-step-indicator';

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#434567',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#545678',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#434678',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#545454',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#325643',
  stepIndicatorLabelFinishedColor: '#656675',
  stepIndicatorLabelUnFinishedColor: '#434564',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#345678'
}

export default class TimeTracker extends Component {
  render() {
    return (
      <View>
        <StepIndicator
          labels={['Art Aee','Bb bb','EE cccc']}
          stepCount={3}
        />
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: 'normal',
            fontFamily: 'Helvetica Neue',
          }}>
          {new Date().toString()}
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

AppRegistry.registerComponent('TimeTracker', () => TimeTracker);
