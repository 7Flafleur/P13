import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setUser,setToken } from '../redux/UserAuthSlice';
import { useSelector } from "react-redux";


export default function useFetchToken(token) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const rememeberMe = useSelector(state => state.userAuth.rememeberMe);

    if (rememeberMe){
        const token = localStorage.getItem('token')
    }
else{
    const token = useSelector(state => state.userAuth.token);
}
    
    useEffect(() => {
        let isMounted = true; // track if component is mounted
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const res = await axios.post('http://localhost:3001/api/v1/user/profile', {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (isMounted) {
                    setResponse(res.data.body);
                    dispatch(setUser(res.data.body));
                }
            } catch (error) {
               localStorage.removeItem('token')
                if (isMounted) {
                    setError(error);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        if (token) {
            fetchUserData();
        }

        return () => {
            isMounted = false; // cleanup to avoid state updates if the component is unmounted
        };
    }, [ ]);

    return { response, error, loading };
}
