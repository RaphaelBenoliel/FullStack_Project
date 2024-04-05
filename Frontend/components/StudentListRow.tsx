// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, StatusBar, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import React, { FC, useState } from 'react';

const StudentListRow: FC<{name: string, id: string,imgUrl: string, 
    onStudentSelected:(name: string, id: string) => void }> = ({name, id, imgUrl ,onStudentSelected }) => {
        const onPress = () => {
            console.log('Student selected with name:', name, 'and id:', id);
            onStudentSelected(name, id);
        }
  return (
    <TouchableHighlight 
        onPress={onPress}
        underlayColor={'#28244a'}
    >

    <View style={styles.listRow}>
      <Image style={styles.avatar} source={{uri: imgUrl}} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.id}>{id}</Text>
      </View>
    </View>
    </TouchableHighlight>
  );
}

//
const styles = StyleSheet.create({
  container: {
    // marginTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0d1117',

  },
  listRow: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 1,
    elevation: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#201f29',
    borderWidth: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
    marginBottom: 15,
  },
  id: {
    color: 'white',
    fontSize: 15,
    marginLeft: 10,
  },

});

export default StudentListRow;