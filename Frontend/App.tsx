// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, StatusBar, TouchableOpacity, Button } from 'react-native';
import React, { FC, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StudentListPage from './components/StudentListPage';
import StudentDetailsPage from './components/StudentDetailsPage';
import StudentAddPage from './components/StudentAddPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; // A
const StudentsListStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



const StudentsListScreen: FC = () => {
  return (
    <StudentsListStack.Navigator
    screenOptions={
      {headerStyle: {
        backgroundColor: '#0d1117',
      },
      headerTintColor: '#fff', 
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <StudentsListStack.Screen name="StudentListPage" component={StudentListPage} options={{ title: 'Students List' }} />
      <StudentsListStack.Screen name="StudentDetailsPage" component={StudentDetailsPage} options={{ title: 'Student Details' }} />
      <StudentsListStack.Screen name="StudentAddPage" component={StudentAddPage} options={{ title: 'Add New Student' }} />
    </StudentsListStack.Navigator>
  );
}

export default function App() {

  return (
    <NavigationContainer>
       <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#0d1117',
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#8b949e',
        }}
       >
        <Tab.Screen name="StudentsListScreen" component={StudentsListScreen} options={{ headerShown: false,  }} />
        <Tab.Screen name="StudentAddPage" component={StudentAddPage} options={{ title: 'Add New Student', headerStyle: {
        backgroundColor: '#0d1117',
      },
      headerTintColor: '#fff', 
      headerTitleStyle: {
        fontWeight: 'bold',
      }
     }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   // marginTop: StatusBar.currentHeight,
  //   flex: 1,
  //   flexDirection: 'column',
  //   backgroundColor: '#0d1117',

  // }
});
