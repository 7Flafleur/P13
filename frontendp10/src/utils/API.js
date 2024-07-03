import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { setUser } from '../redux/Slices';

export default function useFetch(token) { // Assuming token is passed as a prop to this hook

    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

      const dispatch = useDispatch();

    const fetchUserData = async (token) => { // Mark the function as async
        setLoading(true); // Ensure loading is set to true at the start of the fetch
        try {
            const Response = await axios.post('http://localhost:3001/api/v1/user/profile', {}, { // Await the axios call
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Authorization Header: ", `Bearer ${token}`);
            console.log("Response", Response.data.body);

            setResponse(Response.data.body); // Assuming you want to store the entire response data
            dispatch(setUser(response))
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError(error);
        } finally {
            setLoading(false); // Set loading to false in finally block
        }
    };

    useEffect(() => {
        if (token) { // Check if token exists before making the call
            fetchUserData(token);
        }
    }, [token]); // Add token as a dependency to useEffect

    return { response, error, loading }; // Return the state from the hook for use in components
}