import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = 'http://localhost:8080/api/todos';

// ✅ Add a request interceptor to include Authorization header if token exists
axios.interceptors.request.use(
    function (config) {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// 📦 API methods
export const getAllTodos = () => axios.get(BASE_REST_API_URL);

export const addTodo = (todo) => axios.post(BASE_REST_API_URL, todo);

export const getTodoById = (id) => axios.get(`${BASE_REST_API_URL}/${id}`);

export const updateTodo = (id, todo) => axios.put(`${BASE_REST_API_URL}/${id}`, todo);

export const deleteTodo = (id) => axios.delete(`${BASE_REST_API_URL}/${id}`);

export const completeTodo = (id) => axios.patch(`${BASE_REST_API_URL}/${id}/complete`);

export const inCompleteTodo = (id) => axios.patch(`${BASE_REST_API_URL}/${id}/in-complete`);
