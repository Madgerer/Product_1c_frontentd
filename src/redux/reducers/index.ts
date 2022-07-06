import {combineReducers} from 'redux';
import {reducer as authReducer} from "./auth";
import {reducer as langReducer} from "./languages";
import {reducer as priceGroupReducer} from "./priceGroups";
import {reducer as catalogReducer} from "./catalogs";
import {reducer as sellmarksReducer} from "./sellmarks";
import localReducer from "./local";
import {reducer as catalogGroupReducer} from "./catalogGroups";
import {reducer as distributionTypesReducer} from "./distributionsTypes";
import {reducer as categoriesReducer} from "./categories";

const rootReducer = combineReducers({
    authState: authReducer,
    languageState: langReducer,
    priceGroupsState: priceGroupReducer,
    catalogState: catalogReducer,
    sellmarkState: sellmarksReducer,
    catalogGroupState: catalogGroupReducer,
    distributionTypesState: distributionTypesReducer,
    categoriesState: categoriesReducer,
    local: localReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;