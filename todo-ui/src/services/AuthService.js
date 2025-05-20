import axios from "axios";

const AUTH_REST_API_URL = 'http://localhost:8080/api/auth';

// === Token handling ===

// Získání tokenu z sessionStorage
export const getToken = () => sessionStorage.getItem("token");

// Uložení tokenu do sessionStorage (s "Bearer" prefixem)
export const storeToken = (token) => {
    if (!token.startsWith('Bearer ')) {
        token = 'Bearer ' + token;
    }
    sessionStorage.setItem("token", token);
};

// Přidání tokenu do všech požadavků
axios.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    error => Promise.reject(error)
);

// === API calls ===

// Registrace
export const registerAPICall = (registerObj) =>
    axios.post(`${AUTH_REST_API_URL}/register`, registerObj);

// Přihlášení
export const loginAPICall = (usernameOrEmail, password) =>
    axios.post(`${AUTH_REST_API_URL}/login`, { usernameOrEmail, password });

// === Uživatelská data ===

// Uložení přihlášeného uživatele a role
export const saveLoggedInUser = (username, role) => {
    sessionStorage.setItem("authenticatedUser", username);
    sessionStorage.setItem("role", role);
};

// Získání přihlášeného uživatele
export const getLoggedInUser = () => sessionStorage.getItem("authenticatedUser");

// Kontrola přihlášení
export const isUserLoggedIn = () => getLoggedInUser() !== null;

// Kontrola admin role
export const isAdminUser = () => sessionStorage.getItem("role") === 'ROLE_ADMIN';

// Odhlášení
export const logout = () => {
    sessionStorage.clear();
};
