import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type CategoryComponentState = {
    groupFilter: string
}

const INITIAL_STATE: CategoryComponentState = {
    groupFilter: ""
}

const categorySlice = createSlice({
    name: "categoryPage",
    initialState: INITIAL_STATE,
    reducers: {
        setFilter(state: CategoryComponentState, action: PayloadAction<string>) {
            state.groupFilter = action.payload;
            return state;
        }
    }
})

const actions = categorySlice.actions;
const reducer = categorySlice.reducer;

export {actions, reducer}


