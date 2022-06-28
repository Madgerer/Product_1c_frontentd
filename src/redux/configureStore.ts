import {applyMiddleware, Store} from "redux";
import {configureStore} from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import rootReducer, {AppState} from "./reducers";
import {IThunkExtraParam} from "../app/App";

export default function configureAppStore(
    initialState = {}, extra: IThunkExtraParam,
): Store<AppState> {
    const middleWares = [ thunk.withExtraArgument<IThunkExtraParam>(extra) ];
    return configureStore({
        reducer: rootReducer,
        middleware: middleWares
    });
}