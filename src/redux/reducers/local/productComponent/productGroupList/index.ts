import {ICardValidationType, IProductGroupIdentity} from "./types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type IProductGroupIdentityWithCheck = IProductGroupIdentity & {checked: boolean}

export type ProductGroupListComponentState = {
    productGroups: IProductGroupIdentityWithCheck[],
    filter: string
    selectedCardType: ICardValidationType,
    cardTypes: ICardValidationType[]
}

const INITIAL_STATE: ProductGroupListComponentState = {
    productGroups: [],
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
        setChecked(state: ProductGroupListComponentState, action: PayloadAction<{id: string, checked: boolean}>) {
            const product = state.productGroups.find(x => x.id === action.payload.id)
            if(product === undefined)
                return state;
            product.checked = action.payload.checked;
            return state;
        },
        setSelected(state: ProductGroupListComponentState, action: PayloadAction<number>){
            state.selectedCardType = state.cardTypes.find(x => x.value === action.payload) ?? state.selectedCardType;
            return state;
        }
    },
    extraReducers: builder => {
       /* builder.addCase(getProductIdentityThunk.fulfilled, (state, action) => {
            state.products = action.payload.map(x => {
                return {
                    id: x.id,
                    name: x.name,
                    checked: false
                }
            });
            return state;
        })
        builder.addCase(getProductIdentityThunk.rejected, (state, action) => {
            console.log(`Can't get products identities. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })*/
    }
});

const actions = productGroupComponentSlice.actions;
const reducer = productGroupComponentSlice.reducer;

export {actions, reducer}

