import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Dimensions } from 'react-native';
import { Post } from '../model/PostModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserModel, { IUser } from '../model/UserModel';
import { BASE_URL } from '../config';
import { getRandomTimestamp } from '../utils/timeAmp';

const { width } = Dimensions.get('window');

const PostListRow: FC<{ post: Post, onPostSelected: (post: Post) => void }> = ({ post, onPostSelected }) => {
  const [user, setUser] = useState<IUser>();
  const [timestamp, setTimestamp] = useState<string>(getRandomTimestamp());

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

  const onPress = () => {
    console.log('Post selected with owner name:', post.owner.name, 'and id:', post.owner._id);
    onPostSelected(post);
    if (user?._id === post.owner._id) {
      console.log('This is your post');
    }
  }

  const ownerImageUri = post.owner.imgUrl ? post.owner.imgUrl.replace('localhost', BASE_URL) : null;
  const commentImageUri = post.commentUrl ? post.commentUrl.replace('localhost', BASE_URL) : null;

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={'#28244a'}
      style={styles.touchable}
    >
      <View style={styles.listRow}>
        <View style={styles.header}>
          {ownerImageUri ?
            <Image style={styles.avatar} source={{ uri: ownerImageUri }} /> :
            <Image style={styles.avatar} source={require('../assets/avatar.png')} />
          }
          <View style={styles.userInfo}>
            <Text style={styles.name}>{post.owner.name}</Text>
            {/* <Text style={styles.timestamp}>{timestamp}</Text>  */}
          </View>
        </View>
        <Text style={styles.comment}>{post.comment}</Text>
        {commentImageUri &&
          <Image style={styles.image} source={{ uri: commentImageUri }} />
        }
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  touchable: {
    marginBottom: 20,
  },
  listRow: {
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'column',
  },
  name: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timestamp: {
    color: 'gray',
    fontSize: 12,
  },
  comment: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    resizeMode: 'cover',
  },
});

export default PostListRow;
