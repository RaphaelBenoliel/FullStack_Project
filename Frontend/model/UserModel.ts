import { Alert } from "react-native";
import UserApi from "../api/UserApi";
import AuthApi from "../api/AuthApi";
import PostApi from "../api/PostApi";


export interface IUser  {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  tokens: string[];
  imgUrl: string;
  _id: string;
}

interface UploadImageResponse {
    message: string;
    url: string;
  }

export const getUser = async (token: string) => {
    const response:any = await UserApi.getUser(token);
    if (response.status !== 200) {
        throw new Error(response.data);
    }

    return response.data;
}

export const updateUser = async (token: any, _id: any, name: string, phone: string, address: string, imgUrl: string) => {
    const response:any = await UserApi.updateUser(token, _id, name, phone, address , imgUrl);
    try {
      const resposts:any = await PostApi.updatePostsOwner({_id, name, imgUrl});
      console.log('resposts:', resposts);

        
    } catch (error) {
        console.error('Error:', error);
    }
    
    
    if (response.status == 200) {
        return response.data;
    }
    else {
        Alert.alert(response.data);
    }
}

// const uploadImage = async (imageUri: string): Promise<string> => {
//     try {
//       const formData = new FormData();
//       const uriParts = imageUri.split(".");
//       const fileType = uriParts[uriParts.length - 1];
//       const filename = "photo" + Date.now().toString() + "." + fileType;
//       console.log("filename: " + filename);
  
//       formData.append("file", {
//         uri: imageUri,
//         type: `image/`,
//         name: filename,
//       });
     
//       const res:any = await UserApi.uploadImage(formData);
//       // console.log("upload res: " + res.data);
//       if(!res.ok){
//         console.log("save failed " + res.status); //TODO
//         console.log(res.data);
//         return "";
//       } else {  
//         console.log("save passed");
//         console.log(res.data);
//         return res.data.url;
//       }
//       // const data = res.data as UploadImageResponse;
  
//       // if (data.message !== "Uploaded successfully") {
//       //   console.log("save failed " + res.status); //TODO
//       //   console.log(data.message);
//       // } else {
//       //   console.log("save passed");
//       //   const url = data.url;
//       //   return url;
//       // }
//     } catch (err) {
//       console.log("save failed " + err);
//     }
//     return "";
//   };


export default {
    getUser,
    updateUser,
    // uploadImage, 
};
    