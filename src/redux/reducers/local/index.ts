import {combineReducers} from "redux";
import {reducer as loginComponentReducer} from "./loginComponent";
import {reducer as productComponentReducer} from "./productComponent/productList"
import {reducer as productGroupComponentReducer} from "./productComponent/productGroupList";

export const localReducer = combineReducers({
    loginComponent: loginComponentReducer,
    productListComponent: productComponentReducer,
    productGroupListComponent: productGroupComponentReducer
})

export type LocalState = ReturnType<typeof localReducer>;

export default localReducer;