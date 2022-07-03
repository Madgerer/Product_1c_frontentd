import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICatalogGroup} from "../../../domain/types";

export type CatalogGroupsState = {
    groups: ICatalogGroup[],
    selected: ICatalogGroup
}

export enum CatalogGroup {
    Web = 0,
    Printed = 1
}

const catGroupsOptions: ICatalogGroup[] = [
    { id:1, name: "Печатный каталог"},
    { id:0, name: "Web"}
]

const initialCatGroup = catGroupsOptions[1];

const INITIAL_STATE: CatalogGroupsState = {
    groups: catGroupsOptions,
    selected: initialCatGroup
}

const catGroupSlice = createSlice({
    name: "catalogGroup",
    initialState: INITIAL_STATE,
    reducers: {
        setSelected(state: CatalogGroupsState, action: PayloadAction<number>){
            state.selected = state.groups.find(x => x.id === action.payload) ?? state.selected;
            return state;
        }
    }
})

const reducer = catGroupSlice.reducer;
const actions = catGroupSlice.actions;

export {reducer, actions};