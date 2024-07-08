// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';

// import { setUser } from '../redux/Slices';

// export default async function useFetch(token) { 

//     const [response, setResponse] = useState(null);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(true);


//     const user = useSelector(state => state.userAuth.user);


//     const dispatch = useDispatch();

//     const fetchUserData = async (token) => { 
//         setLoading(true); 
//         try {
//             const Response = await axios.post('http://localhost:3001/api/v1/user/profile', {}, { 
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             // console.log("Authorization Header: ", `Bearer ${token}`);
//             // console.log("Response", Response.data.body);

//             setResponse(Response.data.body); 
//             dispatch(setUser(response))
//             console.log("store User ", user)
//         } catch (error) {
//             console.error("Error fetching user data:", error);
//             setError(error);
//             console.log("Loading")
//         }
//     };

//     useEffect(() => {
//         if (token) { 
//             fetchUserData(token);
//         }
//     }, [token,dispatch]); 

//     return { response, error, loading }; // Return the state from the hook for use in components
// }



import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/UserAuthSlice';

export default function useFetch(token) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

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
    }, [token, dispatch]);

    return { response, error, loading };
}
