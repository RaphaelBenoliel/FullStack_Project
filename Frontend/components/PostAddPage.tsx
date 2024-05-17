import React, { FC, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostModel, { Post } from '../model/PostModel';
import UserModel, { IUser } from '../model/UserModel';
import { Ionicons } from '@expo/vector-icons';
import UserApi from '../api/UserApi';

const PostAddPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [comment, setComment] = useState<string>('');
  const [commentUrl, setCommentUrl] = useState<string>('');
  const [user, setUser] = useState<IUser>();
  // const [imageUri, setImageUri] = useState<string>('');

  useEffect(() => {
    const getUserInfo = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const user = await UserModel.getUser(token);
        setUser(user);
      }
    };
    getUserInfo();
  }, []);

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
        setCommentUrl(uri);
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
        setCommentUrl(uri);
      }
    } catch (err) {
      console.log("fail opening camera " + err);
    }
  };

  const onCancel = () => {
    setComment('');
    setCommentUrl('');
    navigation.navigate('All Posts');
  };

  const onSave = async () => {
    const post: Post = {
      _id: '', // You can generate an ID using a unique identifier library or from the server
      owner: {
        name: user?.name ?? '',
        _id: user?._id ?? '',
        imgUrl: user?.imgUrl ?? '',
      },
      comment: comment,
      commentUrl: commentUrl, // Save the image URL in commentUrl
    };
    try {
      if (commentUrl !== "") {
        const url = await UserApi.uploadImage(commentUrl);
          post.commentUrl = url;
          console.log("url: " + post.commentUrl);
      }
      if (comment === '') {
        Alert.alert('Please enter a comment');
        return;
      }
      const res = await PostModel.createPost(post);
      navigation.navigate('All Posts');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.commentContainer}>
      <TextInput
        style={styles.input}
        value={comment}
        onChangeText={setComment}
        placeholder="Enter your comment here..."
        placeholderTextColor="white"
      />

      {commentUrl ? <Image source={{ uri: commentUrl }} style={styles.image} /> : null}
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={openGallery}>
          <Ionicons name="image" size={24} color="white" />
          <Text style={styles.buttonText}>Pick from gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Ionicons name="camera" size={24} color="white" />
          <Text style={styles.buttonText}>Take a photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
    padding: 10,
  },
  commentContainer: {
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#0d1117',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    height: 100,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#372245ee',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold', 
},
  image: {
    width: '100%',
    height:200,
    marginVertical: 10,
    resizeMode: 'contain',
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
  }
});

export default PostAddPage;
