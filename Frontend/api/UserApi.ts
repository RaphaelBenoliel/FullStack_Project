import { from } from 'form-data';
import client from './client';
import axios from 'axios';
import FormData from 'form-data';
import { BASE_URL } from '../config';

const getUser = (token: String) => {
    return client.get(`/user/${token}`);
    };
const updateUser = (token: string,  _id: string,name: string, phone: string, address: string , imgUrl:string) => {
    return client.put(`user/${_id}`, { token, _id, name, phone, address , imgUrl});
    };
    

const uploadImage = async (imageUri: string): Promise<string> => {
    try {
        const formData = new FormData();
        const uriParts = imageUri.split(".");
        const fileType = uriParts[uriParts.length - 1];
        const filename = "photo" + Date.now().toString() + "." + fileType;

        console.log("filename: " + filename);

        formData.append("file", {
            uri: imageUri,
            type: `image/${fileType}`,
            name: filename,
        } as any); // Add `as any` to avoid type issues

        console.log("FormData: ", formData);

        const response = await axios.post(`http://${BASE_URL}:3000/file/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status !== 200) {
            throw new Error('Failed to upload image');
        }

        console.log("Upload response:", response.data);
        return response.data.url;
    } catch (error) {
        console.error("Error uploading image:", error);
        return "";
    }
};



    
    

export default {
    getUser,
    updateUser,
    uploadImage,
};