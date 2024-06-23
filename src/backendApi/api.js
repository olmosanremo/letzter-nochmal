import axios from 'axios';

const API_URL = 'http://localhost:3000/api/synthdata';

export const saveDrawing = async (name, lines) => {
    try {
        const response = await axios.post(`${API_URL}/save`, { name, lines });
        return response.data;
    } catch (error) {
        console.error('Error saving drawing:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const loadDrawing = async (name) => {
    try {
        const response = await axios.get(`${API_URL}/load/${name}`);
        return response.data;
    } catch (error) {
        console.error('Error loading drawing:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updateDrawing = async (name, lines) => {
    try {
        const response = await axios.patch(`${API_URL}/update`, { name, lines });
        return response.data;
    } catch (error) {
        console.error('Error updating drawing:', error.response ? error.response.data : error.message);
        throw error;
    }
};
