import mongoose from "mongoose";

export interface IPost {
    comment: string;
    commentUrl: string;
    owner: { _id: string; name: string; imgUrl: string };
}

const postSchema = new mongoose.Schema<IPost>({
   
    comment: {
        type: String,
        
    },
    commentUrl: {
        type: String,
        
    },
    owner: { _id: String, name: String, imgUrl: String },
});

export default mongoose.model<IPost>("Post", postSchema);