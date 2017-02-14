// import NavigationBar from 'react-native-navbar'
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  AppRegistry,
  ScrollView,
} from 'react-native'

import {
  Button,
  Icon,
} from 'react-native-elements'

import StepIndicator from 'react-native-step-indicator';
// import { Tabs, Tab, Icon } from 'react-native-elements'
// import { Container, Footer, FooterTab, Content, Header, Title, List, ListItem, Badge, Icon } from 'native-base';
// import { MKButton } from 'react-native-material-kit';

const dummyData = [
  {date: new Date(), body:'0, 家の掃除'},
  {date: new Date(), body:'Twitterでリプライ'},
  {date: new Date(), body:'2, Twitterでリプライ'},
  {date: new Date(), body:'Twitterでリプライ'},
  {date: new Date(), body:'4, 睡眠開始'},
  {date: new Date(), body:'Twitterでリプライ'},
  {date: new Date(), body:'6, 睡眠終了'},
  {date: new Date(), body:'Twitterでリプライ'},
  {date: new Date(), body:'8, 睡眠終了'},
  {date: new Date(), body:'Twitterでリプライ'},
];

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "rgba(139,213,177,1)",
//     alignItems: 'flex-end'
  },
  inner: {
    position: 'absolute',
    right: 10,
    bottom: 10,
//     backgroundColor: '#434343',
//    justifyContent: 'flex-end',
//     flex: 1,
//     marginRight: 10,
//     marginBottom: 10,
  },
  mainView: {
    backgroundColor: "rgba(89,138,160,1)",
    height: dummyData.length * 80,
    marginLeft: 10,
    marginTop: 10
//     flex: 1
  },
  indicator: {
    backgroundColor: "rgba(123,90,183,1)",    
    flex: 1
  }
});

export default class AnatomyExample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.mainView}>
            <StepIndicator
              stepCount={dummyData.length}
              direction='vertical'
              labels={dummyData.map(item => item.body)}
            />
          </View>
        </ScrollView>
        <View style={styles.inner}>
          <Icon
            raised
            reverse
            name='add'
            type='content'
            color="rgba(97,167,221,1)"
            onPress={() => console.log('hello')}
          />
          </View>
      </View>
    );
  }
}
AppRegistry.registerComponent('TimeTracker', () => AnatomyExample );
    