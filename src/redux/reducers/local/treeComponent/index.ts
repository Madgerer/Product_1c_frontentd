import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProductGroupBasicModel} from "../../../../app/common/tables/productGroupTable/types";
import {numericRestrictions} from "../../../../utils/regexpUtlis";
import {ICardDistributionType} from "../../../../domain/types";
import {getProductGroupsBasicThunk, getProductsGroupsBasicThunk1} from "./thunks";


export type TreeComponentState = {
    productGroups: IProductGroupBasicModel[],
    filter: string,
    isProductGroupsLoading: boolean,
    sortNumber: string,
    selectedCardType: ICardDistributionType,
    cardTypes: ICardDistributionType[],
}

const INITIAL_STATE: TreeComponentState = {
    productGroups: [],
    filter: "",
    isProductGroupsLoading: false,
    sortNumber: "",
    cardTypes: [
        {label: "Все карточки", value: 0},
        {label: "Непроверенное описание", value: 1},
        {label: "Непроверенное фото", value: 2},
        {label: "Проверено все", value: 3}
    ],
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
        setSortNumber(state: TreeComponentState, action: PayloadAction<string>) {
            const noRestrictions = sortValidationRegex.test(action.payload)
            if(noRestrictions) {
                state.sortNumber = action.payload;
            }
            return state;
        },
        setSelectedCardType(state: TreeComponentState, action: PayloadAction<number>) {
            state.selectedCardType = state.cardTypes.find(x => x.value === action.payload) ?? state.selectedCardType;
            return state;
        }
    },
    extraReducers: builder => {
        builder.addCase(getProductGroupsBasicThunk.pending, (state, action) => {
            state.isProductGroupsLoading = true;
            return state;
        })
        builder.addCase(getProductGroupsBasicThunk.fulfilled, (state, action) => {
            state.productGroups = action.payload.map(x => {
                return{
                    id: x.id,
                    name: x.name,
                    checked: false,
                    isImageChecked: x.isImageChecked,
                    isLoading: false,
                    products: null,
                    isDescriptionChecked: x.isDescriptionChecked,
                    showStatus: x.showStatus,
                    sort: x.sort
                }
            });
            state.isProductGroupsLoading = false;
            return state;
        })
        builder.addCase(getProductGroupsBasicThunk.rejected, (state, action) => {
            state.isProductGroupsLoading = false;
            console.log(`Can't get products identities. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const actions = slice.actions;
const reducer = slice.reducer;

export {actions, reducer}