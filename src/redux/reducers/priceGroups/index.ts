import {IPriceGroup} from "./types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type PriceGroupState = {
    priceGroups: IPriceGroup[]
};

const INITIAL_STATE: PriceGroupState = {
    priceGroups: [],
}

const priceGroup = createSlice({
    name: "priceGroups",
    initialState: INITIAL_STATE,
    reducers: {
        setPriceGroups(state: PriceGroupState, action: PayloadAction<IPriceGroup[]>){
            state.priceGroups = action.payload;
            return state;
        }
    }
})

const reducer = priceGroup.reducer;
const actions = priceGroup.actions;

export {reducer, actions};