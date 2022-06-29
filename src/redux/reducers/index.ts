import { combineReducers } from 'redux';
import {reducer as authReducer} from "./auth";
import {reducer as langReducer} from "./languages";
import {reducer as priceGroupReducer } from "./priceGroups";

const rootReducer = combineReducers({
    authState: authReducer,
    languageState: langReducer,
    priceGroupsState: priceGroupReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;