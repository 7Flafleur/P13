import { createSlice } from '@reduxjs/toolkit';

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState: {
        user: null, // User information
        
        token: null, // Authentication token
    },
    reducers: {
        loginSuccess: (state, action) => {
            // Assuming action.payload contains { user: {...}, token: "..." }
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
        // Optionally, a separate action to just set/update the token
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
});

export const { loginSuccess, logout, setToken } = userAuthSlice.actions;

export default userAuthSlice.reducer;