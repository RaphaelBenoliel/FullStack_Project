import React,{useState, FC, useEffect} from 'react';
import { StyleSheet, View, StatusBar, Text,TextInput,Alert,TouchableOpacity, Image} from 'react-native';
import AuthApi from '../api/AuthApi';
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import UserModel, { IUser } from '../model/UserModel';
import UserApi from '../api/UserApi';


const RegisterPage: FC<{ navigation: any }> = ({ navigation }) => {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [name, onChangeName] = useState('');
    const [phone, onChangePhone] = useState('');
    const [address, onChangeAddress] = useState('');
    const [imgUri, onChangeImgUri] = useState('');
    
    const onSave = async () => {
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Name:', name);
        console.log('Phone:', phone);
        console.log('Address:', address);
        console.log('imgUri:', imgUri);
        const user: IUser = {
            email: email,
            password: password,
            name: name,
            phone: phone,
            address: address,
            imgUrl: 'url',
            tokens: [],
            _id: '',

        }
        try {
            if (imgUri !== "") {
                const url = await UserApi.uploadImage(imgUri);
                user.imgUrl = url;
                console.log("url: " + user.imgUrl);
              }
            const response = await AuthApi.register(user);
            console.log('Response:', response);
            if (response.status === 400) {
                Alert.alert(String(response.data));
            }
            if (response.status === 200) {
                navigation.navigate('LoginPage');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const requestPermission = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!granted) {
          alert("You need to enable permission to access the library.");
        }
      }

      useEffect(() => {
        requestPermission();
      } , []);

    const openCamera = async () => {
        try {
          const res = await ImagePicker.launchCameraAsync();
          if (!res.canceled && res.assets.length > 0) {
            const uri = res.assets[0].uri;
            onChangeImgUri(uri);
          }
        } catch (err) {
          console.log("fail opening camera " + err);
        }
      };
    
      const openGallery = async () => {
        try {
          const res = await ImagePicker.launchImageLibraryAsync();
          if (!res.canceled && res.assets.length > 0) {
            const uri = res.assets[0].uri;
            onChangeImgUri(uri);
          }
        } catch (err) {
          console.log("fail opening camera " + err);
        }
      };
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#0d1117" barStyle="light-content"/>
            
            {/* <Image style={styles.avatar} source={require('../assets/ES-Network.png')} /> */}
            <Text style={styles.title}>ES-Network</Text>
            <View>
        {imgUri === "" && (
          <Image
            style={styles.avatar}
            source={require("../assets/avatar.png")}
          />
        )}
        {imgUri !== "" && (
          <Image style={styles.avatar} source={{ uri: imgUri }} />
        )}

        <TouchableOpacity onPress={openCamera}>
          <Ionicons name={"camera"} style={styles.cameraButton} size={50} />
        </TouchableOpacity>
        <TouchableOpacity onPress={openGallery}>
          <Ionicons name={"image"} style={styles.galleryButton} size={50} />
        </TouchableOpacity>
      </View>
            <TextInput 
                style={styles.input}
                value={email}
                onChangeText={onChangeEmail}
                placeholder="Email"
                placeholderTextColor={'white'}
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={onChangePassword}
                placeholder="Password"
                placeholderTextColor={'white'}
            />
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={onChangeName}
                placeholder="Name"
                placeholderTextColor={'white'}
            />
            <TextInput
                style={styles.input}
                value={phone}
                onChangeText={onChangePhone}
                placeholder="Phone"
                placeholderTextColor={'white'}
            />
            <TextInput
                style={styles.input}
                value={address}
                onChangeText={onChangeAddress}
                placeholder="Address"
                placeholderTextColor={'white'}
            />
            <TouchableOpacity style={styles.button} onPress={onSave}>
                <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>

            <Text style={styles.textdown}>Already have an account?</Text>
        <TouchableOpacity 
            onPress={() => navigation.navigate('LoginPage')}>
            <Text style={styles.signup}>LOGIN</Text>
        </TouchableOpacity>
        </View>
    );
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
        
        alignSelf: 'center',
        color: 'white',
        marginTop: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'white',
        color: 'white',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#841584',
        padding: 10,
        margin: 12,
    },
    buttonText: {
        color: 'white',
    },
    avatar: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 50,
      },
      textdown: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 15,
    }
    ,
    signup: {
        marginTop: 10,
        color: '#841584',
        fontWeight: 'bold',
        fontSize: 17,
        alignSelf: 'center'
    },
    cameraButton: {
            color: "white",
            alignSelf: "flex-start",
            marginTop: 0,
        },
      galleryButton: {
        color: "white",
        alignSelf: "flex-end",
        marginTop: -50,
      },
});

export default RegisterPage;