import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProductGroupBasic} from "../../../../domain/types";
import {IProductGroupBasicModel} from "../../../../app/common/tables/productGroupTable/types";
import {ProductGroupListComponentState} from "../productComponent/productGroupList";


export type TreeComponentState = {
    groups: IProductGroupBasicModel[],
    filter: string,
    isProductGroupsLoading: boolean
}

const INITIAL_STATE: TreeComponentState = {
    groups: [],
    filter: "",
    isProductGroupsLoading: false
}

const slice = createSlice({
    name: "treePage/groupList",
    initialState: INITIAL_STATE,
    reducers: {
        setFilter(state: TreeComponentState, action: PayloadAction<string>) {
            state.filter = action.payload.toLowerCase()
            return state;
        },
        setLoading(state: TreeComponentState, action: PayloadAction<boolean>) {
            state.isProductGroupsLoading = action.payload;
            return state;
        }
    }
})

const actions = slice.actions;
const reducer = slice.reducer;

export {actions, reducer}