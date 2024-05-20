import client from './client';
import { IUser } from '../model/UserModel';
import { CredentialResponse } from "@react-oauth/google"

const login = (email:any, password:any) => {
    return client.post('/auth/login', { email, password });
}

const register = (user : IUser) => {
    return client.post('/auth/register', { user: user });
}

const logout = (userId: any) => {
    return client.get(`/auth/logout/${userId}`);
}
const SignInWithGoogle = (credentialResponse: CredentialResponse) => {
    return new Promise<IUser>((resolve, reject) => {
        console.log("googleSignin ...")
        client.post("/auth/google", credentialResponse).then((response) => {
            console.log(response)
            resolve(response.data as IUser) // Explicitly type the response data as IUser
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

export default {
    login,
    register,
    logout,
    SignInWithGoogle
};
