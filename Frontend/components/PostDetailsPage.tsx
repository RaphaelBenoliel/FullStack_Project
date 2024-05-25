import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, StatusBar } from 'react-native';
import React, { useState, FC, useEffect } from 'react';
import PostModel from '../model/PostModel';
import { BASE_URL } from '../config';

const PostDetailsPage: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    console.log('PostDetailsPage mounted');
    const post = route.params.post;

  //   useEffect(() => {
  //     navigation.setOptions({
  //         headerLeft: () => (
  //             <TouchableOpacity onPress={() => navigation.navigate('My Posts')}>
  //                 <Ionicons name="arrow-back" size={24} color="white" style={{ marginLeft: 15 }} />
  //             </TouchableOpacity>
  //         ),
  //     });
  // }, [navigation]);

    const onEdit = () => {
        console.log('Edit post:', post);
        navigation.navigate('PostEditPage', { post: post });
    };
    const onDelete = () => {
      console.log('Delete post:', post);
      Alert.alert(
        'Delete Post',
        'Are you sure you want to delete this post?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              console.log('OK Pressed');
              await PostModel.deletePost(post._id);
              navigation.navigate('MyPostPage');
            },
          },
        ],
        { cancelable: false }
      );
    }


    return (
        <View style={styles.container}>
          <View style={styles.commentContainer}>
         
          <Text style={styles.input}>{post?.comment}</Text>
          {post.commentUrl == '' ? null : (
            <Image style={styles.image}
            source={{ uri: post?.commentUrl.replace('localhost', BASE_URL)}}
            />
          )}
            
          </View>
            <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={onEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
       
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        backgroundColor: '#0d1117',
        
    },
    commentContainer: {
      
      flexDirection: 'column',
      padding: 10,
      backgroundColor: '#0d1117',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 5,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      backgroundColor: 'blue',
    },
    image: {
      width: '100%',
      height: 200,
      marginVertical: 10,
      resizeMode: 'contain',
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

export default PostDetailsPage;