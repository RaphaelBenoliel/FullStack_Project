import { useState,useEffect,FC } from "react";
import { View, Text, StyleSheet, Image, TextInput, ActivityIndicator, Button, Alert,TouchableOpacity, ScrollView} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import UserModel,{IUser} from "../model/UserModel";
import UserApi from "../api/UserApi";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from "expo-image-picker";
import { validateInputs, ValidationResult } from '../utils/validationUtils';
import { BASE_URL } from "../config";


const EditProfilePage: FC<{ navigation: any}> = ({ navigation}) => {
    const [user, setUser] = useState<IUser>();
    const [email, onChangeEmail] = useState<string>('');
    const [password, onChangePassword] = useState('');
    const [name, onChangeName] = useState('');
    const [phone, onChangePhone] = useState('');
    const [address, onChangeAddress] = useState('');
    const [token, setToken] = useState<String>();
    const [imgUri, onChangeImgUri] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<boolean>(false);
  
    useEffect(() => {
        const getUserInfo = async () => {
          setLoading(true);
          try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const user = await UserModel.getUser(token);
                setUser(user);
                setToken(token);
                // console.log('User:', user?.imgUrl);
                onChangeImgUri(user?.imgUrl.replace('localhost',BASE_URL));
                onChangeEmail(user?.email);
            }
        } catch (error) {
            console.error('Error:', error);
        }   finally {
          // Artificial delay to show the loading indicator
          setTimeout(() => {
            setLoading(false);
          }, 1000); // 2 seconds delay
        }
        }
        getUserInfo();
    }, [])

    const onSave = async () => {
        
         // Provide a default value of an empty string if user?.email is undefined
        const validationResult: ValidationResult = validateInputs(email, "123456", name, phone, address);
        console.log('Validation result:', validationResult);
        if (!validationResult.isValid) {
          setErrors(validationResult.errors);
          return;
        }
        setLoading(true);
        try {
          if (imgUri !== "" || imgUri !== user?.imgUrl) {
            const url = await UserApi.uploadImage(imgUri);
            if (user) {
              user.imgUrl = url;
              console.log("url: " + user.imgUrl);
            }
          }
          const response = await UserModel.updateUser(token , user?._id , name, phone, address, user?.imgUrl ?? '');
          navigation.reset({ index: 0, routes: [{ name: 'My Profile' }] })
        } catch (error) { 
          console.error('Error:', error);
        }   finally {
          // Artificial delay to show the loading indicator
          setTimeout(() => {
            setLoading(false);
          }, 2000); // 2 seconds delay
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
        {loading && <ActivityIndicator size="large" color="#00ff00" style={styles.loadingIndicator} />} 
      <ScrollView contentContainerStyle={styles.scrollContainer}>
           <View>
           
        
            {imgUri === "" && (
          <Image
            style={styles.avatar}
            source={require("../assets/avatar.png")}
          />
        )}
        {imgUri !== "" && (
          <Image style={styles.avatar} source={{uri: imgUri }} />
        )}
         <TouchableOpacity onPress={openCamera}>
          <Ionicons name={"camera"} style={styles.cameraButton} size={50} />
        </TouchableOpacity>
        <TouchableOpacity onPress={openGallery}>
          <Ionicons name={"image"} style={styles.galleryButton} size={50} />
        </TouchableOpacity>
      </View>
            <Text style={styles.input}>{user?.email}</Text>
            {/* <TextInput
                style={styles.input}
                value={password}
                onChangeText={onChangePassword}
                placeholder="Password"
                placeholderTextColor={'#aea5a5'}
            /> */}
             {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={onChangeName}
                placeholder={user?.name}
                placeholderTextColor={'#aea5a5'}
            />
            {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}
            <TextInput
                style={styles.input}
                value={phone}
                onChangeText={onChangePhone}
                placeholder={user?.phone}
                placeholderTextColor={'#aea5a5'}
            />
            {errors.phone ? <Text style={styles.error}>{errors.phone}</Text> : null}
            <TextInput
                style={styles.input}
                value={address}
                onChangeText={onChangeAddress}
                placeholder={user?.address}
                placeholderTextColor={'#aea5a5'}
            />
            {errors.address ? <Text style={styles.error}>{errors.address}</Text> : null}    
             <View style={styles.buttons}>
       <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('My Profile')} >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
        
        </ScrollView>
       </View>
      
    );
}

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
    marginTop: -40,
    borderRadius: 50,
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
    button: {
      flex: 1,
      marginHorizontal: 5,
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#372245ee',
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
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
  error: {
    color: 'red',
    marginLeft: 12,
  },
scrollContainer: {
  flexGrow: 1,
  justifyContent: 'center',
},
loadingIndicator: {
  position: 'absolute',
  top: '50%',
  left: '50%',
  zIndex: 1000,
},
});


export default EditProfilePage;
