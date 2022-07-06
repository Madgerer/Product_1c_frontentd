import {combineReducers} from "redux";
import {reducer as loginComponentReducer} from "./loginComponent";
import {reducer as productComponentReducer} from "./productComponent/productList"
import {reducer as productGroupComponentReducer} from "./productComponent/productGroupList";
import {reducer as categoryReducer} from "./categoryComponent";
import {reducer as treeReducer} from "./treeComponent";
import {reducer as translateReducer} from "./translateComponent";

export const localReducer = combineReducers({
    loginComponent: loginComponentReducer,
    productListComponent: productComponentReducer,
    productGroupListComponent: productGroupComponentReducer,
    categoryComponent: categoryReducer,
    treeComponent: treeReducer,
    translateComponent: translateReducer
})

export default localReducer;