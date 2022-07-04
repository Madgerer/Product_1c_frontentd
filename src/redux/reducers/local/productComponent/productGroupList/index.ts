import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ILoadingModel} from "../../../../types";
import {ICardValidationType, IProductGroupIdentity, IProductIdentity} from "../../../../../domain/types";
import {getProductByGroupThunk, getProductsGroupsIdentityThunk} from "./thunk";
import {IProductGroupIdentityModel} from "../../../../../app/common/tables/productGroupTable/types";



export type ProductGroupListComponentState = {
    productGroups: IProductGroupIdentityModel[],
    isProductGroupsLoading: boolean,
    filter: string
    selectedCardType: ICardValidationType,
    cardTypes: ICardValidationType[],
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
        setLoading(state: ProductGroupListComponentState, action: PayloadAction<boolean>) {
            state.isProductGroupsLoading = action.payload;
            return state;
        },
        setProductGroupLoading(state: ProductGroupListComponentState, action: PayloadAction<{productGroupId: string, isLoading: boolean}>) {
            const index = state.productGroups.findIndex(x => x.id === action.payload.productGroupId)
            if(index >= 0)
                state.productGroups[index].isLoading = action.payload.isLoading;
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
        builder.addCase(getProductsGroupsIdentityThunk.fulfilled, (state, action) => {
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
            return state;
        })
        builder.addCase(getProductsGroupsIdentityThunk.rejected, (state, action) => {
            console.log(`Can't get products groups. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(getProductByGroupThunk.fulfilled, (state, action) => {
            const index = state.productGroups.findIndex(x => x.id === action.payload.productGroupId)
            if(index >= 0)
                state.productGroups[index].products = action.payload.products;
            return state;
        })
        builder.addCase(getProductByGroupThunk.rejected, (state, action) => {
            console.log(`Can't get products identities. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
});

const actions = productGroupComponentSlice.actions;
const reducer = productGroupComponentSlice.reducer;

export {actions, reducer}

