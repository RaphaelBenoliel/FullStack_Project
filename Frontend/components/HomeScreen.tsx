import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import PostListPage from './PostListPage';
import PostAddPage from './PostAddPage';
import PostDetailsPage from './PostDetailsPage';
import PostEditPage from './PostEditPage';
import ProfilePage from './ProfilePage';
import EditProfilePage from './EditProfilePage';
import MyPostPage from './MyPostPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const ProfileScreenStack = createNativeStackNavigator();
const PostListScreenStack = createNativeStackNavigator();
const MyPostScreenStack = createNativeStackNavigator();

const ProfileScreens: FC = () => {
  return (
    <ProfileScreenStack.Navigator
        screenOptions={{
            headerStyle: {
            backgroundColor: '#0d1117',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerShown: false,
        }}
    >
      <ProfileScreenStack.Screen
        name="My Profile"
        component={ProfilePage}
        options={{headerShown: true}}
      />
      <ProfileScreenStack.Screen
        name="EditProfilePage"
        component={EditProfilePage}
        options={{title: 'Edit Profile', headerShown: true}}
      />
    </ProfileScreenStack.Navigator>
  );
};

const PostListScreens : FC = () => {
  return (
    <PostListScreenStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0d1117',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}
    >
      <PostListScreenStack.Screen
        name="All Posts"
        component={PostListPage}
        options={{ headerShown: true }}
      />
       <PostListScreenStack.Screen
        name="PostAddPage"
        component={PostAddPage}
        options={{ title: 'Add New Post', headerShown: true}}
      />
    </PostListScreenStack.Navigator>
  );
};

const MyPostScreens : FC = () => {
  return (
    <MyPostScreenStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0d1117',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}
    >
      <MyPostScreenStack.Screen
        name="MyPostPage"
        component={MyPostPage}
        options={{ headerShown: true, title: 'My Posts'}}
      />
      <MyPostScreenStack.Screen
        name="PostDetailsPage"
        component={PostDetailsPage}
        options={{ headerShown: true , title: 'Post Details'}}
      />
      <MyPostScreenStack.Screen
        name="PostEditPage"
        component={PostEditPage}
        options={{ headerShown: true , title: 'Edit Post'}}
      />
    </MyPostScreenStack.Navigator>
  );
};

const HomeScreen: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#0d1117',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: '#0d1117',
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#8b949e',
        tabBarIcon: ({ color, size }) => {
          let iconName:any ;

          if (route.name === 'Posts') {
            iconName = 'list';
          } else if (route.name === 'My Posts') {
            iconName = 'document-text';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Posts"
        component={PostListScreens}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="My Posts"
        component={MyPostScreens}
        options={{ headerShown: false   }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreens}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
