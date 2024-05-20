import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert, Image,ActivityIndicator, StatusBar } from "react-native";
import React, { FC, useState,useEffect } from "react";
import AuthApi from "../api/AuthApi";

import AsyncStorage from '@react-native-async-storage/async-storage';
import GoogleSignIn from "./GoogleSignIn";
// import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';


const LoginPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        // console.log('Token:', token);
        if (token) {
          setAuth(true);
          navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }], 
          });
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        // Artificial delay to show the loading indicator
        setTimeout(() => {
          setLoading(false);
        }, 2000); // 2 seconds delay
      }
      
    };
    checkAuth();
  }
  , [auth]);

  const onSave = async () => {
    console.log('Email:', email);
    console.log('Password:', password);
    setLoading(true);
    try {
      const response: any = await AuthApi.login(email, password);
      // console.log('Response:', response);
      if (response.status === 400) {
        Alert.alert(String(response.data)); 
      }
      if (response.status === 200) {
        await AsyncStorage.setItem('token', response.data.refreshToken);
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeScreen' }], 
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }finally {
      // Artificial delay to show the loading indicator
      setTimeout(() => {
        setLoading(false);
      }, 2000); // 2 seconds delay
    }
  };
//   const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
//     console.log(credentialResponse)
//     try {
//         const res = await AuthApi.SignInWithGoogle(credentialResponse)
//         console.log(res)
//     } catch (e) {
//         console.log(e)
//     }
// }

// const onGoogleLoginFailure = () => {
//     console.log("Google login failed")
// }
  return (
    
    <View style={styles.container}>
      
      {loading && <ActivityIndicator size="large" color="#00ff00" style={styles.loadingIndicator} />} 
      <StatusBar backgroundColor="#0d1117" barStyle="light-content"/>
      <Image style={styles.avatar} source={require('../assets/ES-Network.png')} />
      <Text style={styles.title}>ES-Network</Text>
      
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={onChangeEmail}
        placeholder="Email"
        placeholderTextColor={'#aea5a5'}
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={onChangePassword}
        placeholder="Password"
        placeholderTextColor={'#aea5a5'}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={onSave}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      
      <Text style={styles.textdown}>Don't have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')}>
        <Text style={styles.signup}>SIGN UP</Text>
      </TouchableOpacity>
     

      {/* <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginFailure} /> */}
      <GoogleSignIn />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0d1117',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
    marginTop: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#372245ee',
    padding: 10,
    borderColor: 'white',
    color: 'white',
  },
  button: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#372245ee',
  },
  buttonText: {
    color: 'white',
  },
  textdown: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 15,
  },
  signup: {
    marginTop: 10,
    color: '#841584',
    fontWeight: 'bold',
    fontSize: 17,
    alignSelf: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 1000,
  },
});

export default LoginPage;
