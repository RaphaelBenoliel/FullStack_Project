import React, {FC,useState, useEffect} from "react";
import { StyleSheet, View, Text, Image, Button, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserModel, { IUser } from "../model/UserModel";
import { BASE_URL } from "../config";
import AuthApi from "../api/AuthApi";


const ProfilePage: FC <{navigation: any }> = ({ navigation }) => {
   
    const [user, setUser] = useState<IUser>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            const getUserInfo = async () => {
                try {
                    const token = await AsyncStorage.getItem('token');
                    if (token) {
                        const user = await UserModel.getUser(token);
                        console.log('User:', user);
                        setUser(user);
                    }
                } catch (error) {
                    console.error('Error:', error);
                } finally {
                    // Artificial delay to show the loading indicator
                    setTimeout(() => {
                      setLoading(false);
                    }, 1000); // 2 seconds delay
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
                    color={'#372245ee'}
                    
                />
            ),     
            headerLeft: () => (
                <Button
                    onPress={() => onLogout()}
                    title="LOGOUT"
                    color={'#372245ee'}
                    
                />
            ),
        })
    }, [navigation,user])
        
        const onLogout = async () => {
            console.log('Logout ...User', user);
            const res = await AuthApi.logout(user?._id);
            console.log('ressullltttt   ',res);

            await AsyncStorage.removeItem('token');
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginPage' }], 
              });
            };
    return (
        <View style={styles.container}>
           {loading && 
                <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00ff00" style={styles.loadingIndicator} />
                </View>} 
        {user?.imgUrl === "" && (
          <Image
            style={styles.avatar}
            source={require("../assets/avatar.png")}
          />
        )}
        {user?.imgUrl !== "" && (
          <Image style={styles.avatar} source={{uri: user?.imgUrl.replace('localhost',BASE_URL) }} />
        )}
            <Text style={styles.text}> Name</Text>
            <Text style={styles.input}>{user?.name}</Text>
            <Text style={styles.text}> Email</Text>
            <Text style={styles.input}>{user?.email}</Text>
            <Text style={styles.text}> Phone</Text>     
            <Text style={styles.input}>{user?.phone}</Text>
            <Text style={styles.text}> Address</Text>
            <Text style={styles.input}>{user?.address}</Text>
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
        borderRadius: 5,
        backgroundColor: '#372245ee',
        padding: 10,
        // borderColor: 'white',
        color: 'white',
    },
    text: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    loadingIndicator: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 1000,
      },
      loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        elevation: 1000,
        backgroundColor: 'rgba(0,0,0,0.7)',
      },
});

export default ProfilePage;