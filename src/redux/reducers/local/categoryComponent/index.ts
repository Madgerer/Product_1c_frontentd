import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getProductByGroupFromCategoryThunk, uploadProductGroupFromCatalogsThunk} from "./thunk";
import {
    IProductGroupIdentityModel, mapCategoryToModel
} from "../../../../app/common/tables/productGroupTable/types";

export type CategoryComponentState = {
    groupFilter: string,
    isGroupsLoading: boolean
    productGroups: IProductGroupIdentityModel[]
}

const INITIAL_STATE: CategoryComponentState = {
    groupFilter: "",
    isGroupsLoading: false,
    productGroups: [],
}

const categorySlice = createSlice({
    name: "categoryPage",
    initialState: INITIAL_STATE,
    reducers: {
        setFilter(state: CategoryComponentState, action: PayloadAction<string>) {
            state.groupFilter = action.payload;
            return state;
        },
        setGroupsLoading(state: CategoryComponentState, action: PayloadAction<boolean>) {
            state.isGroupsLoading = action.payload;
            return state;
        },
        setProductGroupLoading(state: CategoryComponentState, action: PayloadAction<{productGroupId: string, isLoading: boolean}>) {
            const index = state.productGroups.findIndex(x => x.id === action.payload.productGroupId)
            if(index >= 0)
                state.productGroups[index].isLoading = action.payload.isLoading;
            return state;
        },
    },
    extraReducers: builder => {
        builder.addCase(uploadProductGroupFromCatalogsThunk.fulfilled, (state, action) => {
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
        builder.addCase(uploadProductGroupFromCatalogsThunk.rejected, (state, action) => {
            console.log(`Can't get products groups. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(getProductByGroupFromCategoryThunk.fulfilled, (state, action) => {
            const index = state.productGroups.findIndex(x => x.id === action.payload.productGroupId)
            if(index >= 0)
                state.productGroups[index].products = action.payload.products;
            return state;
        })
        builder.addCase(getProductByGroupFromCategoryThunk.rejected, (state, action) => {
            console.log(`Can't get products identities. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})



const actions = categorySlice.actions;
const reducer = categorySlice.reducer;

export {actions, reducer}


