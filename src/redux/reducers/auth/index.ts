import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LocalStorageKeys} from "../../../LocalStorageKeys";

export type AuthState = {
    username: string | null;
    token: string | null;
};

const INITIAL_STATE: AuthState = {
    username: window.localStorage.getItem(LocalStorageKeys.UsernameKey),
    token: window.localStorage.getItem(LocalStorageKeys.TokenKey)
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
    }
})

const reducer = authSlice.reducer;
const actions = authSlice.actions;

export {reducer, actions};
