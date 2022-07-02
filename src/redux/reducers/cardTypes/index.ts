import {IOptionType} from "../../../app/common/SimpleSelect";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type CardTypesState = {
    cardTypes: IOptionType[],
    selected: IOptionType
}

const catGroupsOptions: IOptionType[] = [
    { value:0, label: "Нераспределенные карточки"},
    { value:2, label: "Распределенные карточки"},
]

const initialCardType = catGroupsOptions[0];

const INITIAL_STATE: CardTypesState = {
    cardTypes: catGroupsOptions,
    selected: initialCardType
}

const cardTypesSlice = createSlice({
    name: "cardTypes",
    initialState: INITIAL_STATE,
    reducers: {
        setSelected(state: CardTypesState, action: PayloadAction<number>){
            state.selected = state.cardTypes.find(x => x.value === action.payload) ?? state.selected;
            return state;
        }
    }
})

const reducer = cardTypesSlice.reducer;
const actions = cardTypesSlice.actions;

export {reducer, actions};
