import {applyMiddleware, Store} from "redux";
import {configureStore} from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import rootReducer, {AppState} from "./reducers";

export default function configureAppStore(
    initialState = {},
): Store<AppState> {
    return configureStore({
        reducer: rootReducer
    });
}