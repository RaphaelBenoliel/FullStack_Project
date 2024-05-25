import PostApi from "../api/PostApi";

export type Post = {
    _id: string,
    comment: string,
    commentUrl: string,
    owner: { _id: string, name: string, imgUrl: string }
}

const getPosts = async () => {
    const response:any = await PostApi.getAllPosts();
    if (response.status !== 200) {
        throw new Error(response.data);
    }

    return response.data;
}

const createPost = async (post: Post) => {
    const response:any = await PostApi.createPost(post);
    if (!response.ok) {
        console.log(response.data);
        throw new Error(response.data);
    }

    return response.data;
}

const updatePost = async (post: Post) => {
    const response:any = await PostApi.updatePost(post);
    if (!response.ok) {
        throw new Error(response.data);
    }

    return response.data;
}

const deletePost = async (id: string) => {
    const response:any = await PostApi.deletePost(id);
    if (!response.ok) {
        throw new Error(response.data);
    }

    return response.data;
}
export default {

    getPosts,
    createPost,
    updatePost,
    deletePost,
};


