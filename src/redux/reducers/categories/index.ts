import {ICategoryIdentityModel, mapCategoryToModel} from "../../../app/common/tables/productGroupTable/types";
import {ICategory} from "../../../domain/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCategoriesThunk} from "./thunk";

export type CategoriesState = {
    categories: ICategoryIdentityModel[],
    isCategoriesLoading: boolean,
    categoryCurrentName: string,
    newCategoryName: string,
    selectedCategory: ICategory | null
}

const INITIAL_STATE: CategoriesState = {
    categories: [],
    isCategoriesLoading: false,
    categoryCurrentName: "",
    newCategoryName: "",
    selectedCategory: null
}

const categorySlice = createSlice({
    name: "categories",
    initialState: INITIAL_STATE,
    reducers: {
        setCategoriesLoading(state: CategoriesState, action: PayloadAction<boolean>) {
            state.isCategoriesLoading = action.payload;
            return state;
        },
        setNewCategoryName(state: CategoriesState, action: PayloadAction<string>) {
            state.newCategoryName = action.payload;
            return state;
        },
        setCurrentCategoryName(state: CategoriesState, action: PayloadAction<string>) {
            state.categoryCurrentName = action.payload;
            return state;
        },
        setSelectedCategory(state: CategoriesState, action: PayloadAction<{selected: boolean, categoryId: number}>) {
            const category = findCategory(state.categories, action.payload.categoryId);
            if(category != null) {
                category.selected = action.payload.selected;
                state.categoryCurrentName = category.name;
                state.selectedCategory = category;
            }
            return state;
        },
        setCategoryChecked(state: CategoriesState, action: PayloadAction<{checked: boolean, categoryId: number}>) {
            const category = findCategory(state.categories, action.payload.categoryId);
            if(category != null)
                category.checked = action.payload.checked;

            return state;
        }
    },
    extraReducers: builder => {
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