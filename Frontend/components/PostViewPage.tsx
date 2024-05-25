// PostDetailPage.tsx
import React, { FC } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { BASE_URL } from '../config';



const PostDetailPage: FC<any> = ({ route }) => {
  const { post } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        {post.owner.imgUrl ? (
          <Image source={{ uri: post.owner.imgUrl.replace('localhost', BASE_URL) }} style={styles.avatar} />
        ) : (
          <Image source={require('../assets/avatar.png')} style={styles.avatar} />
        )}
        <Text style={styles.userName}>{post.owner.name}</Text>
      </View>
      <View style={styles.imageContainer}>
      <Text style={styles.comment}>{post.comment}</Text>
         {post.commentUrl && <Image source={{ uri: post.commentUrl.replace('localhost', BASE_URL) }} style={styles.image} />}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0d1117',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  comment: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default PostDetailPage;
