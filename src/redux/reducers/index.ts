import { combineReducers } from 'redux';
import {reducer as authReducer} from "./auth";
import {reducer as langReducer} from "./languages";
import {reducer as priceGroupReducer } from "./priceGroups";
import localReducer from "./local";

const rootReducer = combineReducers({
    authState: authReducer,
    languageState: langReducer,
    priceGroupsState: priceGroupReducer,
    local: localReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;