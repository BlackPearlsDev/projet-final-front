import axios from 'axios';

export const getCategories = async () => {
    try {
        return await axios.get("/api/v1/category/all");
    } catch (error) {
        return error;
    }
}

export const addCategory = async (category) => {
    try {
        return await axios.post("/api/v1/category/create", category); // apres la virgule c'est le body /!\
    } catch (error) {
        return error;
    }
}

export const deleteCategory = async (id) => {
    try {
        return await axios.delete(`/api/v1/category/delete/${id}`);
    } catch (error) {
        return error;
    }
}