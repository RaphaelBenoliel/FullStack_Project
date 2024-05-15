import client from './client';
import { IUser } from '../model/UserModel';

const login = (email:any, password:any) => {
    return client.post('/auth/login', { email, password });
}

const register = (user : IUser) => {
    return client.post('/auth/register', { user: user });
}

const logout = () => {
    return client.post('/auth/logout');
}

export default {
    login,
     register,
    logout,
};
