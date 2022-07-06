import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCatalogs} from "./thunk";
import {ICatalog} from "../../../domain/types";


export type CatalogState = {
    catalogs: ICatalog[],
    selected: ICatalog,
    wasInit: boolean
};

const initalCatalog: ICatalog = {
    id: 0,
    name: "Loading",
    isPrinted: true
}

const INITIAL_STATE: CatalogState = {
    catalogs: [initalCatalog],
    selected: initalCatalog,
    wasInit: false
}

const catalogSlice = createSlice({
    name: "catalog",
    initialState: INITIAL_STATE,
    reducers: {
        setSelected(state: CatalogState, action: PayloadAction<number>){
            state.selected = state.catalogs.find(x => x.id === action.payload) ?? state.selected;
            return state;
        }
    },
    extraReducers: builder => {
        builder.addCase(getCatalogs.fulfilled, (state, {payload}) => {
            state.catalogs = payload
            state.wasInit = true;
        })
        builder.addCase(getCatalogs.rejected, (state, action) => {
            console.error(`Cant download price groups: Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const reducer = catalogSlice.reducer;
const actions = catalogSlice.actions;

export {reducer, actions};