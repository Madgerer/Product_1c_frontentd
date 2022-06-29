import {Action, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LocalStorageProvider} from "../../../api/LocalStorageProvider";

export type AuthState = {
    username: string | null;
    token: string | null;
};

const INITIAL_STATE: AuthState = {
    username: LocalStorageProvider.getToken(),
    token: LocalStorageProvider.getUser(),
}

const authSlice = createSlice({
    name: "Auth",
    initialState: INITIAL_STATE,
    reducers: {
        setCredentials(state: AuthState, action: PayloadAction<AuthState>) {
            LocalStorageProvider.setToken(action.payload.token!)
            LocalStorageProvider.setUser(action.payload.username!)
            state.username = action.payload.username;
            state.token = action.payload.token;
            return state;
        },
        clearCredentials(state: AuthState, action: Action) {
            LocalStorageProvider.removeToken()
            LocalStorageProvider.removeUser()
            state.username = null
            state.token = null
        }
    }
})

const reducer = authSlice.reducer;
const actions = authSlice.actions;

export {reducer, actions};
