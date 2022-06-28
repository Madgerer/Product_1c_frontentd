import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LocalStorageKeys} from "../../../LocalStorageKeys";
import {IThunkExtraParam} from "../../../app/App";
import {useState} from "react";

export type AuthState = {
    username: string | null;
    token: string | null;
};

const INITIAL_STATE: AuthState = {
    username: window.localStorage.getItem(LocalStorageKeys.UsernameKey),
    token: window.localStorage.getItem(LocalStorageKeys.TokenKey)
}

const loginThunk = createAsyncThunk<string, { username: string, password:string }, { extra: IThunkExtraParam }>(
    'users/fetchByIdStatus',
    async (arg, thunkAPI) => {
        try {

        }
        catch (e) {

            return thunkAPI.rejectWithValue()
        }
        const res = await thunkAPI.extra.api.auth.login(arg.username, arg.password);
        thunkAPI.dispatch(actions.setCredentials({
            token: res.data,
            username: arg.username
        }))
        return "";
    }
)



const authSlice = createSlice({
    name: "Auth",
    initialState: INITIAL_STATE,
    reducers: {
        setCredentials(state: AuthState, action: PayloadAction<AuthState>) {
            state.username = action.payload.username;
            state.token = action.payload.token;
            return state;
        }
    }
})

const reducer = authSlice.reducer;
const actions = authSlice.actions;

export {reducer, actions};
