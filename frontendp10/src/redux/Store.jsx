import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./UserAuthSlice"
import errorMsgSlice from "./ErrorMessageSlice";


const store = configureStore({
    reducer: {
        userAuth: userAuthSlice.reducer,
        errorMsg: errorMsgSlice.reducer,
    }
})

export default store;