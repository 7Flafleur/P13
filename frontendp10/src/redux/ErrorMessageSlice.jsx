import { createSlice } from '@reduxjs/toolkit';

const errorMsgSlice = createSlice(
    {
        name: "errorMsg",
        initialState: {
            errorMessage:"",
        },
        reducers: {
            setErrorMsg: (state,action) =>{
                if (action.payload){
                    state.errorMessage = action.payload;
                }
                else {
                    console.error("No action payload")
                }
            },

            deleteErrorMsg: (state) =>{
                state.errorMessage="";
            }
        }
    }
);

export const {setErrorMsg, deleteErrorMsg} = errorMsgSlice.actions;
export default errorMsgSlice;