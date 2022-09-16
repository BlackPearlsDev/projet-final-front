import axios from 'axios';

export const checkToken = async (token) => {
    try {
        return await axios.get("/api/v1/user/checkToken", { headers : {"x-access-token": token}});
    } catch (error) {
        return error.response;
    }
}

export const register = async (datas) => {
    try {
        return await axios.post("/api/v1/user/register", datas);
    } catch (error) {
        console.log(error);
        return error.response;
    }
}
export const login = async (datas) => {
    try {
        return await axios.post("/api/v1/user/login", datas);
    } catch (error) {
        console.log(error);
        return error.response;
    }
}

export const update = async (uuid, datas) => {
    try {
        return await axios.patch(`/api/v1/user/${uuid}`, datas);
    } catch (error) {
        console.log(error);
        return error.response;
    }
}