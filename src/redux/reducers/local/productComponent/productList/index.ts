import {IProductIdentity} from "./types";
import {Action, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getProductIdentityThunk} from "./thunks";
import {stat} from "fs";

export type ProductsIdentityWithCheck = IProductIdentity & {checked: boolean}

export type ProductListComponentState = {
    products: ProductsIdentityWithCheck[],
    selected: string[],
    filter: string,
    isLoading: boolean
}

const INITIAL_STATE: ProductListComponentState = {
    products: [],
    filter: "",
    isLoading: true,
    selected: []
}

const productComponentSlice = createSlice({
    name: "productPage/list",
    initialState: INITIAL_STATE,
    reducers: {
        setFilter(state: ProductListComponentState, action: PayloadAction<string>) {
            state.filter = action.payload.toLowerCase()
            return state;
        },
        setChecked(state: ProductListComponentState, action: PayloadAction<{id: string, checked: boolean}>) {
            const product = state.products.find(x => x.id === action.payload.id)
            if(product === undefined)
                return state;
            product.checked = action.payload.checked;
            return state;
        },
        setLoading(state: ProductListComponentState, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
            return state;
        },
        setSelected(state: ProductListComponentState, action: PayloadAction<string>) {
            const index = state.selected.indexOf(action.payload);
            if(index > -1)
                state.selected.splice(index, 1)
            else
                state.selected.push(action.payload)
            return state;
        },
        clearSelected(state: ProductListComponentState, action: Action) {
            state.selected = []
            return state;
        }
    },
    extraReducers: builder => {
        builder.addCase(getProductIdentityThunk.fulfilled, (state, action) => {
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
        })
    }
});

const actions = productComponentSlice.actions;
const reducer = productComponentSlice.reducer;

export {actions, reducer}


