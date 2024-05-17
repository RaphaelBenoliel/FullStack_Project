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
const SignInWithGoogle = async (credentialToken: any) => {
    console.log("SignInWithGoogle()" + credentialToken);
    const data = {
        credentialResponse: credentialToken
    };
    try{
    const response:any  = await client.post("/auth/google", data);
    console.log("response: " + response.data.accessToken);
  
    return response;
    }catch(err){
    console.log("fail registering user " + err);
    }
  
  }

export default {
    login,
    register,
    logout,
    SignInWithGoogle
};
