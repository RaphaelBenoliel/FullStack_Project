import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Button } from 'react-native';
import PostListRow from './PostListRow';
import PostModel, { Post } from '../model/PostModel';
import UserModel,{ IUser } from '../model/UserModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

const MyPostPage: FC<{ navigation: any }> = ({ navigation }) => {
    const [data, setData] = useState<Post[]>([]);
    const [user, setUser] = useState<IUser>();
    const [loading, setLoading] = useState(false);

      useEffect(() => {
        const getUserInfo = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const user = await UserModel.getUser(token);
                    setUser(user);
                }
            }catch (error) {
                console.error('Error:', error);
            }
        };
        getUserInfo();
      }, []);


    const onPostSelected = (post:any ) => {
        console.log('Item selected: ' + post._id);
        navigation.navigate('PostDetailsPage', { post: post });
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

    const userPosts = data.filter(post => post.owner._id === user?._id);
  
    return (
        <View style={styles.container}>
            {loading && 
          <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00ff00" style={styles.loadingIndicator} />
          </View>} 
            <StatusBar backgroundColor="#0d1117" barStyle="light-content"/>
            <FlatList 
                style={styles.flatlist} 
                data={userPosts}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => 
                    <PostListRow 
                        post={item}
                        onPostSelected={(post: Post) => onPostSelected(post)}
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
        backgroundColor: 'rgba(0, 0, 0, 0.848)',
      },
});

export default MyPostPage;
