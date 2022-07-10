import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addProductToGroupAsyncThunk, getProductIdentityThunk} from "./thunks";
import {IProductIdentity} from "../../../../../domain/types";

type ProductsIdentityWithCheck = IProductIdentity & {checked: boolean}

export type ProductListComponentState = {
    products: ProductsIdentityWithCheck[],
    filter: string,
    isLoading: boolean,
    selectedProducts: ProductsIdentityWithCheck[]
}

const INITIAL_STATE: ProductListComponentState = {
    products: [],
    filter: "",
    isLoading: true,
    selectedProducts: []
}

const productComponentSlice = createSlice({
    name: "productPage/list",
    initialState: INITIAL_STATE,
    reducers: {
        setSelected(state: ProductListComponentState, action: PayloadAction<string>) {
           const product = state.products.find(x => x.id === action.payload)
            if(product === undefined)
                return state;
            const selectedIndex = state.selectedProducts.findIndex(x => x.id === action.payload);

            if(selectedIndex > -1)
               state.selectedProducts = state.selectedProducts.splice(selectedIndex, 1);
            else
                state.selectedProducts.push(product)

           product.checked = !product.checked;
           return state;
        },
        setFilter(state: ProductListComponentState, action: PayloadAction<string>) {
            state.filter = action.payload.toLowerCase()
            return state;
        },
        setLoading(state: ProductListComponentState, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
            return state;
        },
        clearStateOnUnmount(state: ProductListComponentState) {
            state.products = [];
            state.filter = "";
            state.isLoading = true
            state.selectedProducts = []
        }
    },
    extraReducers: builder => {
        builder.addCase(getProductIdentityThunk.pending, (state) => {
            state.isLoading = true;
            return state
        })
        builder.addCase(getProductIdentityThunk.fulfilled, (state, action) => {
            state.isLoading = false;
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
            state.isLoading = false;
            console.log(`Can't get products identities. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(addProductToGroupAsyncThunk.fulfilled, (state, action) => {
            state.products = state.products.filter(p => action.meta.arg.productIds.findIndex(x => x === p.id) === -1)
            state.selectedProducts = []
        })
        builder.addCase(addProductToGroupAsyncThunk.rejected, (state, action) => {
            console.log(`Can't update. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
});

const actions = productComponentSlice.actions;
const reducer = productComponentSlice.reducer;

export {actions, reducer}


