import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Button } from 'react-native';
import PostListRow from './PostListRow';
import PostModel, { Post } from '../model/PostModel';
import UserModel,{ IUser } from '../model/UserModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostListPage: FC<{ navigation: any }> = ({ navigation }) => {
    const [data, setData] = useState<Post[]>([]);
    // const [user, setUser] = useState<IUser>();

    //   useEffect(() => {
    //     const getUserInfo = async () => {
    //       const token = await AsyncStorage.getItem('token');
    //       if (token) {
    //         const user = await UserModel.getUser(token);
    //         setUser(user);
            
    //       }
    //     };
    //     getUserInfo();
    //   }, []);


    const onPostSelected = (name: string, id: string) => {
        console.log('Item selected: ' + name);
        // You can navigate to another page or show post details here
    }
  

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            try {
                const posts = await PostModel.getPosts();
                setData(posts);
                // const userPosts = posts.filter(post => post.owner._id === user._id); 
            } catch (error) {
                console.error('Error fetching posts:', error);
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
            <FlatList 
                style={styles.flatlist} 
                data={data}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => 
                    <PostListRow 
                        post={item}
                        onPostSelected={(post: Post) => onPostSelected(post.owner.name, post._id)}
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
    }
});

export default PostListPage;
