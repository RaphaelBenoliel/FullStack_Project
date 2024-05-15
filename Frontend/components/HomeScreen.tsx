import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StudentListPage from './StudentListPage';
import StudentAddPage from './StudentAddPage';
import StudentDetailsPage from './StudentDetailsPage';
import ProfilePage from './ProfilePage';
import EditProfilePage from './EditProfilePage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const ProfileScreenStack = createNativeStackNavigator();

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
        options={{title: 'Edit Profile' , headerShown: true}}
      />
      <ProfileScreenStack.Screen
        name="StudentAddPage"
        component={StudentAddPage}
        options={{ title: 'Add New Student' }}
      />
    </ProfileScreenStack.Navigator>
  );
};

const HomeScreen: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
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
      }}
    >
      <Tab.Screen
        name="All Posts"
        component={StudentListPage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="StudentAddPage"
        component={StudentAddPage}
        options={{
          title: 'Add New Student',
        }}
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
