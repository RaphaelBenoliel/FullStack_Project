import React, { FC ,useEffect,useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Dimensions } from 'react-native';
import { Post } from '../model/PostModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserModel, { IUser } from '../model/UserModel';

const { width } = Dimensions.get('window');
const PostListRow: FC<{ post: Post, onPostSelected: (post: Post) => void }> = ({ post, onPostSelected }) => {
  const [user, setUser] = useState<IUser>();
  
  

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
        console.log('Post selected with owner name:', post.owner.name, 'and id:', post._id);
        onPostSelected(post);
        if (user?._id === post.owner._id) {
            console.log('This is your post');
        }
    }

    return (
      
      
        <TouchableHighlight
            onPress={onPress}
            underlayColor={'#28244a'}
        >
           

            <View style={styles.listRow}>
         
              {post.owner.imgUrl ? <Image style={styles.avatar} source={{ uri: post.owner.imgUrl.replace('localhost', '192.168.1.164') }} /> : 
              <Image style={styles.avatar} source={require('../assets/avatar.png')} />}
                
                <View style={styles.info}>
                    <Text style={styles.name}>{post.owner.name}</Text>
                    <Text style={styles.comment}>{post.comment}</Text>
                    {post.commentUrl==""?null:
                    <Image style={styles.image} source={{ uri: post.commentUrl.replace('localhost', '192.168.1.164') }} />}
                    
                  
                </View>
            </View>
        </TouchableHighlight>
      
     
    );
}

const styles = StyleSheet.create({
    listRow: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 1,
        elevation: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: '#201f29',
        borderWidth: 1,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    info: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
    },
    name: {
        color: 'white',
        fontSize: 20,
        maxWidth: width - 150, // Adjust as needed based on your layout
    },
    comment: {
        color: 'white',
        fontSize: 15,
        marginTop: 5,
        maxWidth: width - 150, // Adjust as needed based on your layout
    },
    image: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
    },
});

export default PostListRow;
