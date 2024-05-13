import client from './client';

const login = (email, password) => {
    return client.post('/auth/login', { email, password });
}

const register = (email, password,name, phone, address) => {
    return client.post('/auth/register', { email, password,name, phone, address });
}

const logout = () => {
    return client.post('/auth/logout');
}

export default {
    login,
    register,
    logout,
};
