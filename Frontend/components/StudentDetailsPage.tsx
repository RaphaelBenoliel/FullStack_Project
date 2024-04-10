import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, StatusBar } from 'react-native';
import React, { useState, FC, useEffect } from 'react';
import StudentModel from '../model/StudentModel';


const StudentDetailsPage: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    const student = StudentModel.getStudentById(route.params.id);
    useEffect(() => {
        console.log('StudentDetailsPage mounted', student?.name);
        navigation.setOptions({
            title: student?.name,
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('StudentAddPage')}
                    title="Edit"
                />
            ),
        })
    }, [])



    return (
        <View style={styles.container}>
            <Image style={styles.avatar}
                source={{ uri: student?.imgUrl }}

            />
            <Text style={styles.input}>{student?.name}</Text>
            <Text style={styles.input}>{student?.id}</Text>
            <Text style={styles.input}>{student?.imgUrl}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // marginTop: StatusBar.currentHeight,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#0d1117',
      },
      title: {
        fontSize: 30,
        fontWeight: 'bold',
        backgroundColor: 'blue',
    },
      avatar: {
        width: 150,
        height: 150,
        borderRadius: 150,
        margin: 10,
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

export default StudentDetailsPage;