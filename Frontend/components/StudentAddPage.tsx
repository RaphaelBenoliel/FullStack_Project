// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import React, { FC, useState } from 'react';
import StudentModel, { Student } from '../model/StudentModel';


const StudentAddPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [name, onChangeName] = useState('');
  const [id, onChangeId] = useState('');
  const [address, onChangeAddress] = useState('');
  const onCancel = () => {
    onChangeName('');
    onChangeId('');
    onChangeAddress('');
    navigation.navigate('StudentListPage');
  }
  const onSave = () => {
    console.log('Name:', name);
    console.log('ID:', id);
    console.log('Address:', address);
    const student: Student = {
      name: name,
      id: id,
      imgUrl: address,
    }
    StudentModel.addStudent(student);
    navigation.navigate('StudentListPage');

  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0d1117" barStyle="light-content"/>
      <Image style={styles.avatar} source={require('../assets/avatar.png')} />
      <TextInput 
        style={styles.input}
        value={name}
        onChangeText={onChangeName}
        placeholder="Enter your name"
        placeholderTextColor={'white'}
      />
      <TextInput 
        style={styles.input}
        value={id}
        onChangeText={onChangeId}
        placeholder="Enter your ID"
        placeholderTextColor={'white'}
      />
      <TextInput 
        style={styles.input}
        value={address}
        onChangeText={onChangeAddress}
        placeholder="Enter your address"
        placeholderTextColor={'white'}
      />
      <View style={styles.buttons}>
       <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      
    </View>
    
  );
}
//
const styles = StyleSheet.create({
  container: {
    // marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#0d1117',
  },
  avatar: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'white',
    color: 'white',
  },
  buttons: {
    // flex:1,
    marginHorizontal: 10,
    // borderRadius: 10,
    // borderWidth: 1,
    // borderColor: 'white',

    backgroundColor: '#841584',
    flexDirection: 'row',
    // alignSelf: 'baseline',
  },
  button: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    // padding: 10,
  }
});

export default StudentAddPage;