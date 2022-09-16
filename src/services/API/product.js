import axios from 'axios';

export const getProducts = async () => {
    try {
        return await axios.get("/api/v1/product/all");
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const deleteProduct = async (id) => {
    try {
        return await axios.delete(`/api/v1/product/${id}`);
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const addProducts = async (product) => {
    try {
        return await axios.post("/api/v1/product/create", product);
    } catch (error) {
        return error;
    }
}

export const addImg = async (img) => {
    try {
        return await axios.post("/api/v1/product/addImg", img);
    } catch (error) {
        return error;
    }
}