import {IWebsite} from "../../../domain/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getWebsitesThunk} from "./thunks";

export type WebSitesState = {
    websites: IWebsite[],
    selected: IWebsite,
    wasInit: boolean
};

const initialWebsite: IWebsite = {
    id: 0,
    name: "Loading",
}

const INITIAL_STATE: WebSitesState = {
    websites: [initialWebsite],
    selected: initialWebsite,
    wasInit: false
}

const slice = createSlice({
    name: "websites",
    initialState: INITIAL_STATE,
    reducers: {
        setSelected(state: WebSitesState, action: PayloadAction<number>){
            state.selected = state.websites.find(x => x.id === action.payload) ?? state.selected;
            return state;
        }
    },
    extraReducers: builder => {
        builder.addCase(getWebsitesThunk.fulfilled, (state, {payload}) => {
            state.websites = payload
            state.wasInit = true;
        })
        builder.addCase(getWebsitesThunk.rejected, (state, action) => {
            console.error(`Cant download price groups: Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const reducer = slice.reducer;
const actions = slice.actions;

export {reducer, actions};