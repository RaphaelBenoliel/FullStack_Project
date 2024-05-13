import client from './client';

const getAllStudents = () => {
    return client.get('/student');
    };

export default {
    getAllStudents,
};