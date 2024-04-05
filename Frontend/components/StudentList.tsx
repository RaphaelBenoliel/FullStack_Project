import React, {FC, useEffect, useState} from 'react';
import { StyleSheet, View, StatusBar, FlatList } from 'react-native';
import StudentListRow from './StudentListRow';
import StudentModel, {Student} from '../model/StudentModel';


const StudentList:FC = () => {
    const [data, setData] = useState<Student[]>([]);

    useEffect(() => {
        setData(StudentModel.getAllStudents());
    },[]);

    const onStudentSelected = (name: string, id: string) => {
        console.log(`You tapped ${name}, ${id}.`);
    }
    return (
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

export default StudentList;