import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./UserAuthSlice"


const store = configureStore({
    reducer: {
        userAuth: userAuthSlice.reducer
    }
})

export default store;