// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import React, { FC, useState } from 'react';
import StudentListRow from './components/StudentListRow';
import StudentList from './components/StudentList';


export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0d1117" barStyle="light-content"/>
      <StudentList />

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0d1117',

  }
});
