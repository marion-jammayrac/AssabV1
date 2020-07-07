//This is an example of Tab inside Navigation Drawer in React Native//
import React from 'react';
//import react in our code.
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {  createAppContainer } from 'react-navigation';
import {  createStackNavigator } from 'react-navigation-stack';

//Import all the screens for Tab
import ViewAllUser from '../ViewAllUser';
import ViewUser from '../ViewUser';
import TestExpandable from '../TestExpandable';

const TabScreen = createMaterialTopTabNavigator(
  {
    Structures: { screen: TestExpandable },
    Recherche: { screen: ViewUser },
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: '#FF9800',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },
  }
);
const TabHelper = createStackNavigator({
  TabScreen: {
    screen: TabScreen,
    navigationOptions: {
      header: null,
    },
  },
});
export default createAppContainer(TabHelper);