import {createSlice, PayloadAction} from "@reduxjs/toolkit";
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
            state.username = action.payload.username;
            state.token = action.payload.token;
            return state;
        }
    }
})

const reducer = authSlice.reducer;
const actions = authSlice.actions;

export {reducer, actions};
