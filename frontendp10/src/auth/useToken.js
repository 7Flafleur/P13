//this is a custom hook

import { useState } from "react";

export const useToken = () => {
    const [token, setTokenInternal] = useState(() => {
        try {
            return localStorage.getItem('token'); // Set existing token to initial state
        } catch (error) {
            console.error("Error accessing localStorage:", error);
            return null;
        }
    });

    const setToken = (newToken) => {
        try {
            if (newToken) {
                localStorage.setItem('token', newToken);
            } else {
                localStorage.removeItem('token'); // Clear token from localStorage when logging out
            }
            setTokenInternal(newToken);
        } catch (error) {
            console.error("Error updating localStorage:", error);
        }
    };

    return { token, setToken }; // Return as an object for better readability
};