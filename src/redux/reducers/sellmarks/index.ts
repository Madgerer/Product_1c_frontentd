import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {uploadSellmarks} from "./thunk";
import {ISellmark} from "../../../domain/types";


export type SellmarkState = {
    sellmarks: ISellmark[],
    selected: ISellmark
};

const initialSellmark: ISellmark = {
    id: 1,
    name: "АвтоDело"
}

const INITIAL_STATE: SellmarkState = {
    sellmarks: [initialSellmark],
    selected: initialSellmark
}

const sellmarkSlice = createSlice({
    name: "catalog",
    initialState: INITIAL_STATE,
    reducers: {
        setSelected(state: SellmarkState, action: PayloadAction<number>){
            state.selected = state.sellmarks.find(x => x.id === action.payload) ?? state.selected;
            return state;
        }
    },
    extraReducers: builder => {
        builder.addCase(uploadSellmarks.fulfilled, (state, {payload}) => {
            state.sellmarks = payload
        })
        builder.addCase(uploadSellmarks.rejected, (state, action) => {
            console.error(`Cant download price groups: Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const reducer = sellmarkSlice.reducer;
const actions = sellmarkSlice.actions;

export {reducer, actions};