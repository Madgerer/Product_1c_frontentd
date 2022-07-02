import {IOptionType} from "../../../app/common/SimpleSelect";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type DistributionType = {
    cardTypes: IOptionType[],
    selected: IOptionType
}

const distibutionOptions: IOptionType[] = [
    { value:0, label: "Нераспределенные карточки"},
    { value:2, label: "Распределенные карточки"},
]

const initialCardType = distibutionOptions[0];

const INITIAL_STATE: DistributionType = {
    cardTypes: distibutionOptions,
    selected: initialCardType
}

const distributionTypesSlice = createSlice({
    name: "distributionType",
    initialState: INITIAL_STATE,
    reducers: {
        setSelected(state: DistributionType, action: PayloadAction<number>){
            state.selected = state.cardTypes.find(x => x.value === action.payload) ?? state.selected;
            return state;
        }
    }
})

const reducer = distributionTypesSlice.reducer;
const actions = distributionTypesSlice.actions;

export {reducer, actions};
