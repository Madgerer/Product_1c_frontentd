import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getPriceGroupsThunk} from "./thunk";
import {IPriceGroup} from "../../../domain/types";

export type PriceGroupState = {
    priceGroups: IPriceGroup[],
    selected: IPriceGroup
};

const defaultPriceGroup = {id: 6, name: "АвтоDело"};

const INITIAL_STATE: PriceGroupState = {
    priceGroups: [defaultPriceGroup],
    selected: defaultPriceGroup
}

const priceGroup = createSlice({
    name: "priceGroups",
    initialState: INITIAL_STATE,
    reducers: {
        setSelected(state: PriceGroupState, action: PayloadAction<number>){
            state.selected = state.priceGroups.find(x => x.id === action.payload) ?? state.selected;
            return state;
        }
    },
    extraReducers: builder => {
        builder.addCase(getPriceGroupsThunk.fulfilled, (state, {payload}) => {
            state.priceGroups = payload
        })
        builder.addCase(getPriceGroupsThunk.rejected, (state, action) => {
            console.error(`Cant download price groups: Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const reducer = priceGroup.reducer;
const actions = priceGroup.actions;

export {reducer, actions};