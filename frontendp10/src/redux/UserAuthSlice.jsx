import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  token: null,
  user: null,
  rememberMe:false,
};


const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            // Check if the action.payload contains only an email or additional properties
            if (action.payload) {
                if (action.payload.email && Object.keys(action.payload).length === 1) {
                    // If only email is provided, set the user object with the email
                    state.user = { email: action.payload.email };
                } else {
                    // If additional properties are provided, set the user object with those properties
                    state.user = {
                        ...state.user, // Preserve existing user properties
                        ...action.payload, // Update user properties with payload
                    };
                }
                // Optionally set the token if it's included in the payload
                if (action.payload.token) {
                    state.token = action.payload.token;
                }
            }

            else {
                console.error("No action payload")
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setRememberMe: (state, action) => {
            state.rememberMe = action.payload;
          },
    },
});

export const { setUser, logout, setToken,setRememberMe } = userAuthSlice.actions;
export default userAuthSlice;