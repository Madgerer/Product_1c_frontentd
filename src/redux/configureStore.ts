import {Store} from "redux";
import {configureStore} from '@reduxjs/toolkit';
import rootReducer, {AppState} from "./reducers";

export default function configureAppStore(
    initialState = {}/*, extra: IThunkExtraParam,*/
): Store<AppState> {
    //const middleWares = [ thunk.withExtraArgument<IThunkExtraParam>(extra) ];
    return configureStore({
        reducer: rootReducer,
        //middleware: middleWares
    });
}