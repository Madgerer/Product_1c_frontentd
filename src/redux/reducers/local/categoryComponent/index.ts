import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    getProductsByGroupThunk,
    getProductGroupsByCatalogsThunk
} from "./thunk";
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

        },
    },
    extraReducers: builder => {
        builder.addCase(getProductGroupsByCatalogsThunk.pending, (state, action) => {
            state.isGroupsLoading = true;
        })
        builder.addCase(getProductGroupsByCatalogsThunk.fulfilled, (state, action) => {
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
            state.isGroupsLoading = false;
            return state;
        })
        builder.addCase(getProductGroupsByCatalogsThunk.rejected, (state, action) => {
            state.isGroupsLoading = false;
            console.log(`Can't get products groups. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(getProductsByGroupThunk.pending, (state, action) => {
            const index = state.productGroups.findIndex(x => x.id === action.meta.arg.productGroupId)
            if(index >= 0)
                state.productGroups[index].isLoading = false;
            return state;
        })
        builder.addCase(getProductsByGroupThunk.fulfilled, (state, action) => {
            const index = state.productGroups.findIndex(x => x.id === action.meta.arg.productGroupId)
            if(index >= 0) {
                state.productGroups[index].products = action.payload;
                state.productGroups[index].isLoading = false;
            }
            return state;
        })
        builder.addCase(getProductsByGroupThunk.rejected, (state, action) => {
            const index = state.productGroups.findIndex(x => x.id === action.meta.arg.productGroupId)
            if(index >= 0)
                state.productGroups[index].isLoading = false;
            console.log(`Can't get products identities. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})


const actions = categorySlice.actions;
const reducer = categorySlice.reducer;

export {actions, reducer}


