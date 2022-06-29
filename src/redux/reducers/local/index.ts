import {combineReducers} from "redux";
import {reducer} from "./loginComponent";

export const localReducer = combineReducers({
    loginComponent: reducer
})

export type LocalState = ReturnType<typeof localReducer>;

export default localReducer;