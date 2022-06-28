import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LocalStorageKeys} from "../../../LocalStorageKeys";
import {IThunkExtraParam} from "../../../app/App";
import {useState} from "react";
import {loginThunk} from "./thunks";

export type AuthState = {
    username: string | null;
    token: string | null;
    error: boolean;
    errorText: string
};

const INITIAL_STATE: AuthState = {
    username: window.localStorage.getItem(LocalStorageKeys.UsernameKey),
    token: window.localStorage.getItem(LocalStorageKeys.TokenKey),
    error: false,
    errorText: ""
}

const authSlice = createSlice({
    name: "Auth",
    initialState: INITIAL_STATE,
    reducers: {
        setCredentials(state: AuthState, action: PayloadAction<AuthState>) {
            state.username = action.payload.username;
            state.token = action.payload.token;
            return state;
        }
    },
   /* extraReducers: builder => {
        builder.addCase(loginThunk.rejected, () => ({
            error: true,
            token: null,
            username: null,
            errorText: ""
        }))
            .addCase(loginThunk.fulfilled, () => ({
                error: false
            }))
    }*/
})

const reducer = authSlice.reducer;
const actions = authSlice.actions;

export {reducer, actions};
