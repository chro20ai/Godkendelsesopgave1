import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import firebase from "firebase/compat";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import "firebase/database";
import "firebase/firestore";
import { doc } from 'firebase/firestore';
import {createStackNavigator} from '@react-navigation/stack'
import Ionicons from "react-native-vector-icons/Ionicons";



import AddEditFood from "./components/AddEditFood";
import FoodDetails from "./components/FoodDetails";
import FoodList from "./components/FoodList";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3WdwH4K379AgqcET1JUhImo91GybPY-E",
  authDomain: "fir-database-5d180.firebaseapp.com",
  databaseURL: "https://fir-database-5d180-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-database-5d180",
  storageBucket: "fir-database-5d180.appspot.com",
  messagingSenderId: "1032963094469",
  appId: "1:1032963094469:web:18b5de5e95dbac3dd1fdac"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  }

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigation = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name={'Food List'} component={FoodList}/>
      <Stack.Screen name={'Food Details'} component={FoodDetails}/>
      <Stack.Screen name={'Edit Food'} component={AddEditFood}/>
    </Stack.Navigator>
)
}


export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name={'Home'} component={StackNavigation} options={{tabBarIcon: () => ( <Ionicons name="home" size={20} />),headerShown:null}}/>
      <Tab.Screen name={'Add'} component={AddEditFood} options={{tabBarIcon: () => ( <Ionicons name="add" size={20} />),headerShown:null}}/>
    </Tab.Navigator>
  </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
