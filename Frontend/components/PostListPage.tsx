import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Button,ActivityIndicator } from 'react-native';
import PostListRow from './PostListRow';
import PostModel, { Post } from '../model/PostModel';
import UserModel,{ IUser } from '../model/UserModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostListPage: FC<{ navigation: any }> = ({ navigation }) => {
    const [data, setData] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);

    const onPostSelected = (post: Post) => {
        navigation.navigate('PostViewPage', { post });
    }
  
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            setLoading(true); 
            try {
                const posts = await PostModel.getPosts();
                setData(posts);
                // const userPosts = posts.filter(post => post.owner._id === user._id); 
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                // Artificial delay to show the loading indicator
                setTimeout(() => {
                  setLoading(false);
                }, 1000); // 2 seconds delay
              }
        });
        return unsubscribe;
    }, [navigation, data]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('PostAddPage')}
                    title="Add Post"
                    color={'#372245ee'}
                />
            ),
        });
    }, [navigation]);

  
  
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#0d1117" barStyle="light-content"/>
            {loading && 
          <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00ff00" style={styles.loadingIndicator} />
          </View>} 
            <FlatList 
                style={styles.flatlist} 
                data={data}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => 
                    <PostListRow 
                        post={item}
                        onPostSelected={(post: Post) => onPostSelected(item)}
                    />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#0d1117',
    },
    flatlist: {
        flex: 1,
        padding: 10,
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

export default PostListPage;
