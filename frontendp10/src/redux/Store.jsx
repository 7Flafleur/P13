import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./Slices"


const store = configureStore({
    reducer:{
        userAuth:userAuthSlice.reducer
    }
})

export default store;