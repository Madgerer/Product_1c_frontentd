import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProductGroupBasicModel} from "../../../../app/common/tables/productGroupTable/types";
import {numericRestrictions} from "../../../../utils/regexpUtlis";
import {ICardDistributionType} from "../../../../domain/types";


export type TreeComponentState = {
    groups: IProductGroupBasicModel[],
    filter: string,
    isProductGroupsLoading: boolean,
    sortNumber: string,
    selectedCardType: ICardDistributionType,
    cardTypes: ICardDistributionType[],
}

const INITIAL_STATE: TreeComponentState = {
    groups: [],
    filter: "",
    isProductGroupsLoading: false,
    sortNumber: "",
    cardTypes: [{label: "Все карточки", value: 0}, {label: "Непроверенное описание", value: 1}, {label: "Непроверенное фото", value: 2}],
    selectedCardType: {label: "Все карточки", value: 0}
}

const sortValidationRegex = numericRestrictions();

const slice = createSlice({
    name: "treePage/groupList",
    initialState: INITIAL_STATE,
    reducers: {
        setFilter(state: TreeComponentState, action: PayloadAction<string>) {
            state.filter = action.payload.toLowerCase()
            return state;
        },
        setLoading(state: TreeComponentState, action: PayloadAction<boolean>) {
            state.isProductGroupsLoading = action.payload;
            return state;
        },
        setSortNumber(state: TreeComponentState, action: PayloadAction<string>) {
            const noRestrictions = sortValidationRegex.test(action.payload)
            if(noRestrictions) {
                state.sortNumber = action.payload;
            }
            return state;
        }
    }
})

const actions = slice.actions;
const reducer = slice.reducer;

export {actions, reducer}