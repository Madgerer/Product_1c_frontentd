import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCategoriesThunk, getProductByGroupFromCategoryThunk, uploadProductGroupFromCatalogsThunk} from "./thunk";
import {
    ICategoryIdentityModel,
    IProductGroupIdentityModel, mapCategoryToModel
} from "../../../../app/common/tables/productGroupTable/types";
import {ICategory} from "../../../../domain/types";

export type CategoryComponentState = {
    groupFilter: string,
    isGroupsLoading: boolean
    productGroups: IProductGroupIdentityModel[]
    categories: ICategoryIdentityModel[],
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
        setSelectedCategory(state: CategoryComponentState, action: PayloadAction<{selected: boolean, categoryId: number}>) {
            const category = findCategory(state.categories, action.payload.categoryId);
            if(category != null) {
                category.selected = action.payload.selected;
                state.categoryCurrentName = category.name;
                state.selectedCategory = category;
            }
            return state;
        },
        setCategoryChecked(state: CategoryComponentState, action: PayloadAction<{checked: boolean, categoryId: number}>) {
            const category = findCategory(state.categories, action.payload.categoryId);
            if(category != null)
                category.checked = action.payload.checked;

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
            state.categories = action.payload.map(x => mapCategoryToModel(x))
            return state;
        })
        builder.addCase(getCategoriesThunk.rejected, (state, action) => {
            console.log(`Can't get products identities. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

function findCategory(categories: ICategoryIdentityModel[], id: number): ICategoryIdentityModel | null {
    for (let i = 0; i < categories.length; i++) {
        const category = searchInTree(categories[i], id);
        if(category != null){
            return category;
        }
    }
    return null;
}

function searchInTree(category: ICategoryIdentityModel, id: number): ICategoryIdentityModel | null {
    if(category.id === id){
        return category;
    }
    else if (category.children != null){
        let result: ICategoryIdentityModel | null = null;
        for(let i=0; result == null && i < category.children.length; i++){
            result = searchInTree(category.children[i], id);
        }
        return result;
    }
    return null;
}

const actions = categorySlice.actions;
const reducer = categorySlice.reducer;

export {actions, reducer}


