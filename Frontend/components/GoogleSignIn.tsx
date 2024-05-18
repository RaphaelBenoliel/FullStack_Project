import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { CLIENT_ID, ANDROID_CLIENT_ID } from '../config';


WebBrowser.maybeCompleteAuthSession();

const GoogleSignIn: React.FC = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            setAccessToken(id_token);
            fetchUserInfo(id_token);
        }
    }, [response]);

    async function fetchUserInfo(token: string) {
        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const userInfoResponse = await response.json();
            setUserInfo(userInfoResponse);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    }

    const ShowUserInfo = () => {
        if (userInfo) {
            return (
                <Text>{JSON.stringify(userInfo)}</Text>
            );
        } else {
            return null;
        }
    }

    return (
        <View style={styles.buttonContainer}>
            <Button
                color={'#5b47b5'}
                disabled={!request}
                title="Login with Google"
                onPress={() => {
                    promptAsync();
                }}
                
            />
            <ShowUserInfo />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        margin: 20,
        width:'50%',
        alignSelf:'center',
        
        color: 'red',
    },

});

export default GoogleSignIn;



// import {
//     GoogleSignin,
//     GoogleSigninButton,
//     statusCodes,
//   } from '@react-native-google-signin/google-signin'
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as WebBrowser from 'expo-web-browser';

// import AuthApi from '../api/AuthApi';

// WebBrowser.maybeCompleteAuthSession();


// export default function GoogleSigninComp() {

//   useEffect(() => {
//     GoogleSignin.configure({
//       webClientId: '1023628505389-cppq919vnstgvmalho4ukj0acjaobnpj.apps.googleusercontent.com', // From Google Developer Console
//       offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//     });
//   }, []);

//   const signIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const userInfo = await GoogleSignin.signIn();
//       console.log('Sign-in successful');
//       const credentialResponse = userInfo.idToken;
//       await AuthApi.SignInWithGoogle(credentialResponse);
      
      
//       // You can now use this userInfo object to authenticate the user in your backend
//     } catch (error: any) {
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         console.log('User cancelled the login flow');
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         console.log('Sign in is in progress');
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         console.log('Play services not available or outdated');
//       } else {
//         console.log('Some other error happened', error);
//       }
//     }
//   };

//   const signOut = async () => {
//     try {
//       await GoogleSignin.revokeAccess();
//       await GoogleSignin.signOut();
//     } catch (error: any) {
//       console.error(error);
//     }
//   };




//   return (
//     <View style={styles.container}>

//       <GoogleSigninButton
//         style={{ width: 192, height: 48 }}
//         size={GoogleSigninButton.Size.Wide}
//         color={GoogleSigninButton.Color.Dark}
//         onPress={signIn}
//       />
//       <Button onPress={signOut} title="Sign out" />

//   </View>
// );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   card: {
//     borderWidth: 1,
//     borderRadius: 15,
//     padding: 15,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
// });