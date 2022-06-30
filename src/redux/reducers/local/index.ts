import {combineReducers} from "redux";
import {reducer as loginComponentReducer} from "./loginComponent";
import {reducer as productComponentReducer} from "./productComponent/productList"

export const localReducer = combineReducers({
    loginComponent: loginComponentReducer,
    productListComponent: productComponentReducer
})

export type LocalState = ReturnType<typeof localReducer>;

export default localReducer;