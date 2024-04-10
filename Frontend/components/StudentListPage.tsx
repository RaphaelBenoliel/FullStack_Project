import React, {FC, useEffect, useState} from 'react';
import { StyleSheet, View, StatusBar, FlatList, Button } from 'react-native';
import StudentListRow from './StudentListRow';
import StudentModel, {Student} from '../model/StudentModel';


const StudentListPage:FC<{ navigation: any }> = ({ navigation }) => {
    const [data, setData] = useState<Student[]>([])
    const onStudentSelected = (name: string, id: string) => {
        console.log('Item selected: ' + name);
        navigation.navigate('StudentDetailsPage', {  name: name, id: id });
    }

    useEffect(() => {
        const unsubsribe = navigation.addListener('focus', () => {
            setData([...StudentModel.getAllStudents()])
            console.log("screen in focus")
        })
        return unsubsribe
    }, [navigation])


    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('StudentAddPage')}
                    title="Add"
                />
            ),
        })
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#0d1117" barStyle="light-content"/>

        <FlatList 
            style={styles.flatlist} 
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => 
                <StudentListRow 
                name={item.name} 
                id={item.id} 
                imgUrl={item.imgUrl}
                onStudentSelected={onStudentSelected}
            />}
        />
        </View>
        );
    }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#0d1117',
    },
    flatlist: {
        flex: 1,
        padding: 10,
    }
    

});

export default StudentListPage;