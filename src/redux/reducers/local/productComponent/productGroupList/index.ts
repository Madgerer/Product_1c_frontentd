import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICardDistributionType} from "../../../../../domain/types";
import {getProductByProductGroupThunk, getProductGroupsIdentityThunk} from "./thunk";
import {IProductGroupIdentityModel} from "../../../../../app/common/tables/productGroupTable/types";

export type ProductGroupListComponentState = {
    productGroups: IProductGroupIdentityModel[],
    isProductGroupsLoading: boolean,
    filter: string
    selectedCardType: ICardDistributionType,
    cardTypes: ICardDistributionType[],
    selectedProductGroup: IProductGroupIdentityModel | null
}

const INITIAL_STATE: ProductGroupListComponentState = {
    isProductGroupsLoading: false,
    productGroups: [],
    selectedProductGroup: null,
    filter: "",
    cardTypes: [{label: "Все карточки", value: 0}, {label: "Непроверенное описание", value: 1}, {label: "Непроверенное фото", value: 2}],
    selectedCardType: {label: "Все карточки", value: 0}
}

const productGroupComponentSlice = createSlice({
    name: "productPage/groupList",
    initialState: INITIAL_STATE,
    reducers: {
        setFilter(state: ProductGroupListComponentState, action: PayloadAction<string>) {
            state.filter = action.payload.toLowerCase()
            return state;
        },
        setSelectedCardType(state: ProductGroupListComponentState, action: PayloadAction<number>){
            state.selectedCardType = state.cardTypes.find(x => x.value === action.payload) ?? state.selectedCardType;
            return state;
        },
        setSelectedProductGroup(state: ProductGroupListComponentState, action: PayloadAction<IProductGroupIdentityModel>) {
            const index = state.productGroups.findIndex(x => x.id === action.payload.id)
            //в случае если "отщелкиваем" чекбокс, чтобы лишний раз не проходить по массиву
            if(state.selectedProductGroup === action.payload) {
                state.selectedProductGroup = null;
                state.productGroups[index].checked = false;
            }
            else {
                const previousSelectedIndex = state.productGroups.findIndex(x => x.id === state.selectedProductGroup?.id)
                //если выбран хоть какой-то элемент до этого
                if(previousSelectedIndex > -1){
                    state.productGroups[previousSelectedIndex].checked = false;
                }
                state.selectedProductGroup = action.payload;
                state.productGroups[index].checked = true;
            }
            return state;
        }
    },
    extraReducers: builder => {
        builder.addCase(getProductGroupsIdentityThunk.pending, (state, action) => {
            state.isProductGroupsLoading = false;
            return state;
        })
        builder.addCase(getProductGroupsIdentityThunk.fulfilled, (state, action) => {
            state.productGroups = action.payload.map(x => {
                return {
                    id: x.id,
                    name: x.name,
                    checked: false,
                    products: null,
                    isDescriptionChecked: x.isDescriptionChecked,
                    isLoading: false,
                    isImageChecked: x.isImageChecked
                }
            });
            state.isProductGroupsLoading = false;
            return state;
        })
        builder.addCase(getProductGroupsIdentityThunk.rejected, (state, action) => {
            console.log(`Can't get products groups. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
            state.isProductGroupsLoading = false;
            return state;
        })
        builder.addCase(getProductByProductGroupThunk.pending, (state, action) => {
            const index = state.productGroups.findIndex(x => x.id === action.meta.arg.productGroupId)
            if(index >= 0)
                state.productGroups[index].isLoading = true;
            return state;
        })
        builder.addCase(getProductByProductGroupThunk.fulfilled, (state, action) => {
            const index = state.productGroups.findIndex(x => x.id === action.meta.arg.productGroupId)
            if(index >= 0) {
                state.productGroups[index].products = action.payload;
                state.productGroups[index].isLoading = false;
            }
            return state;
        })
        builder.addCase(getProductByProductGroupThunk.rejected, (state, action) => {
            console.log(`Can't get products identities. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
});

const actions = productGroupComponentSlice.actions;
const reducer = productGroupComponentSlice.reducer;

export {actions, reducer}

