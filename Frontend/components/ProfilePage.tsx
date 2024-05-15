import React, {FC,useState, useEffect} from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image,Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserModel, { IUser } from "../model/UserModel";


const ProfilePage: FC <{navigation: any }> = ({ navigation }) => {
   
    const [user, setUser] = useState<IUser>();
    useEffect(() => {
            const getUserInfo = async () => {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const user = await UserModel.getUser(token);
                    setUser(user);
                }
            }
            getUserInfo();
    },[])

    useEffect(() => {
        navigation.setOptions({
            title: user?.name,
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('EditProfilePage' )}
                    title="Edit Profile"
                    color={'#841584'}
                    
                />
            ),     
            headerLeft: () => (
                <Button
                    onPress={() => onLogout()}
                    title="LOGOUT"
                    color={'#841584'}
                    
                />
            ),
        })
    }, [navigation])
        
        const onLogout = async () => {
            await AsyncStorage.removeItem('token');
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginPage' }], 
              });
            };
    return (
        <View style={styles.container}>
                 {user?.imgUrl === "" && (
          <Image
            style={styles.avatar}
            source={require("../assets/avatar.png")}
          />
        )}
        {user?.imgUrl !== "" && (
          <Image style={styles.avatar} source={{uri: user?.imgUrl.replace('localhost','192.168.1.164') }} />
        )}
            <Text style={styles.input}>{user?.name}</Text>
            <Text style={styles.input}>{user?.email}</Text>     
            <Text style={styles.input}>{user?.phone}</Text>
            <Text style={styles.input}>{user?.address}</Text>
            {/* <TouchableOpacity style={styles.button} onPress={onLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity> */}
        </View>
    ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#0d1117',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 50,
        margin: 30,
        alignSelf: 'center',
    },
    button: {
        padding: 10,
        margin: 10,

    },
    buttonText: {
        fontWeight: 'bold',
        // textAlign: 'center',
        fontSize: 20,

        color: '#841584',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'white',
        color: 'white',
      },
});

export default ProfilePage;