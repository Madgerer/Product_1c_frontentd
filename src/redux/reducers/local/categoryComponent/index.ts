import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getProductGroupCatsThunk, getProductGroupsByCatalogsThunk, getProductsByGroupThunk} from "./thunk";
import {IProductGroupIdentityModel} from "../../../../app/common/tables/productGroupTable/types";
import {IProductGroupWithCategoryPath} from "../../../../domain/types";
import {ProductGroupListComponentState} from "../productComponent/productGroupList";

export type CategoryComponentState = {
    groupFilter: string,
    isGroupsLoading: boolean
    productGroups: IProductGroupIdentityModel[]
    selectedGroups: IProductGroupIdentityModel[]
    productGroupsWithCategoriesPath: IProductGroupWithCategoryPath[]
}

const INITIAL_STATE: CategoryComponentState = {
    groupFilter: "",
    isGroupsLoading: false,
    productGroups: [],
    selectedGroups: [],
    productGroupsWithCategoriesPath: []
}

const categorySlice = createSlice({
    name: "categoryPage",
    initialState: INITIAL_STATE,
    reducers: {
        setFilter(state: CategoryComponentState, action: PayloadAction<string>) {
            state.groupFilter = action.payload;
            return state;
        },
        removeProductGroupWithCatPath(state: CategoryComponentState, action: PayloadAction<string>) {
            state.productGroupsWithCategoriesPath = state.productGroupsWithCategoriesPath.filter(x => x.productGroupId != action.payload)
        },
        setSelectedProductGroup(state: CategoryComponentState, action: PayloadAction<IProductGroupIdentityModel>) {
            const selectedIndex = state.selectedGroups.findIndex(x => x.id === action.payload.id);
            const index = state.productGroups.findIndex(x => x.id === action.payload.id)

            if(selectedIndex > -1) {
                state.selectedGroups = state.selectedGroups.splice(index, 1)
            }
            if(index > -1) {
                state.productGroups[index].checked = !action.payload.checked
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(getProductGroupsByCatalogsThunk.pending, (state) => {
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
                state.productGroups[index].isLoading = true;
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
        builder.addCase(getProductGroupCatsThunk.fulfilled, (state, action) => {

        })
        builder.addCase(getProductGroupCatsThunk.rejected, (state, action) => {
            console.log(`Can't remove category. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})


const actions = categorySlice.actions;
const reducer = categorySlice.reducer;

export {actions, reducer}


