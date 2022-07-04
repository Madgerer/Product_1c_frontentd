import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCategoriesThunk, getProductByGroupFromCategoryThunk, uploadProductGroupFromCatalogsThunk} from "./thunk";
import {IProductGroupIdentityModel} from "../../../../app/common/tables/productGroupTable/types";
import {ICategory} from "../../../../domain/types";

export type CategoryComponentState = {
    groupFilter: string,
    isGroupsLoading: boolean
    productGroups: IProductGroupIdentityModel[]
    categories: ICategory[],
    isCategoriesLoading: boolean,
    categoryCurrentName: string,
    newCategoryName: string,
    selectedCategory: ICategory | null
}

const INITIAL_STATE: CategoryComponentState = {
    groupFilter: "",
    isGroupsLoading: false,
    productGroups: [],
    categories: [],
    isCategoriesLoading: false,
    categoryCurrentName: "",
    newCategoryName: "",
    selectedCategory: null
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
        setCategoriesLoading(state: CategoryComponentState, action: PayloadAction<boolean>) {
            state.isCategoriesLoading = action.payload;
            return state;
        },
        setNewCategoryName(state: CategoryComponentState, action: PayloadAction<string>) {
            state.newCategoryName = action.payload;
            return state;
        },
        setCurrentCategoryName(state: CategoryComponentState, action: PayloadAction<string>) {
            state.categoryCurrentName = action.payload;
            return state;
        },
        setSelectedCategory(state: CategoryComponentState, action: PayloadAction<ICategory | null>) {
            state.selectedCategory = action.payload;
            return state;
        }
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
        builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
            state.categories = action.payload
            return state;
        })
        builder.addCase(getCategoriesThunk.rejected, (state, action) => {
            console.log(`Can't get products identities. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const actions = categorySlice.actions;
const reducer = categorySlice.reducer;

export {actions, reducer}


