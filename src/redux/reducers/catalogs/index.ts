import {ICatalog} from "./types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {uploadCatalogs} from "./thunk";


export type CatalogState = {
    catalogs: ICatalog[],
    selected: ICatalog
};

const initalCatalog: ICatalog = {
    id: 0,
    name: "Loading"
}

const INITIAL_STATE: CatalogState = {
    catalogs: [initalCatalog],
    selected: initalCatalog
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
        builder.addCase(uploadCatalogs.fulfilled, (state, {payload}) => {
            state.catalogs = payload
        })
        builder.addCase(uploadCatalogs.rejected, (state, action) => {
            console.error(`Cant download price groups: Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const reducer = catalogSlice.reducer;
const actions = catalogSlice.actions;

export {reducer, actions};