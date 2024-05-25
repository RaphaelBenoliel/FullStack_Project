import { Post } from '../model/PostModel';
import client from './client';

const getAllPosts = () => {
    return client.get('/post');
};

const getPostsUser = (_id: string) => {
    return client.get(`/post/user`);
}

const updatePostsOwner = (owner: any) => {
    return client.put('/post/', { owner });
}

const createPost = (post: Post) => {
    return client.post('/post', {  comment: post.comment, commentUrl: post.commentUrl, owner: post.owner });
}
const updatePost = (post: Post) => {
    return client.put(`/post/${post._id}`, { comment: post.comment, commentUrl: post.commentUrl, owner: post.owner });
}

const deletePost = (id: string) => {
    return client.delete(`/post/${id}`);
}

export default {
    getAllPosts,
    getPostsUser,
    createPost,
    updatePostsOwner,
    updatePost,
    deletePost
};