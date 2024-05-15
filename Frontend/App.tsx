// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, StatusBar, TouchableOpacity, Button } from 'react-native';
import React, { FC, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StudentListPage from './components/StudentListPage';
import StudentDetailsPage from './components/StudentDetailsPage';
import StudentAddPage from './components/StudentAddPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; // A
import GoogleSignIn from './components/GoogleSignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
const StudentsListStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 1023628505389-r4ptl499nh99vpok1u2erkdi1gh9g75i.apps.googleusercontent.com
const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const HomeScreen: FC = () => {
  return(
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
        <Tab.Screen name="StudentAddPage" component={StudentAddPage} options={{ title: 'Add New Student'
      //   , headerStyle: {
      //   backgroundColor: '#0d1117',
      // },
      // headerTintColor: '#fff', 
      // headerTitleStyle: {
      //   fontWeight: 'bold',
      // }
     }} />
      </Tab.Navigator>
  )

}
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
  const [auth, setAuth] = useState(false);

  const fetch = async () => {
    const authToken = await AsyncStorage.getItem('token');
    if (authToken) {
      setAuth(true);
    }


    
  }
  fetch();


  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        {auth ? (
          <AuthStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <AuthStack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
            <AuthStack.Screen name="RegisterPage" component={RegisterPage} options={{ headerShown: false }} />
          </>
        )}
      </AuthStack.Navigator>
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