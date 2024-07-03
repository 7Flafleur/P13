//this is a custom hook

import { useState, useEffect } from "react";
import { useToken } from "./useToken";

export const useUser = () => {
    const [token] = useToken();
    const [user, setUser] = useState(null);

    const getPayloadFromToken = (token) => {
        try {
            const encodedPayload = token.split('.')[1]; // extract middle portion (payload part) of jwt
            return JSON.parse(atob(encodedPayload));
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    };

    useEffect(() => {
        setUser(token ? getPayloadFromToken(token) : null);
    }, [token]);

    return user;
};