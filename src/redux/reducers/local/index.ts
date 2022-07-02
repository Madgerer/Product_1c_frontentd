import {combineReducers} from "redux";
import {reducer as loginComponentReducer} from "./loginComponent";
import {reducer as productComponentReducer} from "./productComponent/productList"
import {reducer as productGroupComponentReducer} from "./productComponent/productGroupList";
import {reducer as categoryReducer} from "./categoryComponent";

export const localReducer = combineReducers({
    loginComponent: loginComponentReducer,
    productListComponent: productComponentReducer,
    productGroupListComponent: productGroupComponentReducer,
    categoryComponent: categoryReducer
})

export default localReducer;