import {ICategoryIdentityModel, mapCategoryToModel} from "../../../app/common/tables/productGroupTable/types";
import {CatalogGroup, ICategory} from "../../../domain/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createCategoryThunk, deleteCategoryThunk, getCategoriesThunk, updateCategoryNameThunk} from "./thunk";
import {addProductGroupToCatsThunk} from "../local/categoryComponent/thunk";

export type CategoriesState = {
    categories: ICategoryIdentityModel[],
    isCategoriesLoading: boolean,
    categoryCurrentName: string,
    newCategoryName: string,
    selectedCategory: ICategory | null
    checkCategories: ICategory[]
}

const INITIAL_STATE: CategoriesState = {
    categories: [],
    isCategoriesLoading: false,
    categoryCurrentName: "",
    newCategoryName: "",
    selectedCategory: null,
    checkCategories: []
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
                if(state.selectedCategory !== null && state.selectedCategory.id === action.payload.categoryId) {
                    state.categoryCurrentName = ""
                    state.selectedCategory = null;
                    category.selected = false

                    return state;
                }

                if(state.selectedCategory != null) {
                    const previousCategory = findCategory(state.categories, state.selectedCategory.id)
                    previousCategory!.selected = false;
                }
                category.selected = action.payload.selected;
                state.categoryCurrentName = category.name;
                state.selectedCategory = category;
            }

            return state;
        },
        setCategoryChecked(state: CategoriesState, action: PayloadAction<{checked: boolean, categoryId: number}>) {
            const category = findCategory(state.categories, action.payload.categoryId);
            if(category != null) {
                if(action.payload.checked)
                    state.checkCategories.push(category)
                else
                    state.checkCategories = state.checkCategories.filter(x => x.id !== category.id)
                category.checked = action.payload.checked;
            }
        },
        clearToolbarState(state: CategoriesState) {
            state.categoryCurrentName = ""
            state.selectedCategory = null
        },
        clearOnUnmount(state: CategoriesState) {
            state.selectedCategory = null
            state.categories = []
            state.newCategoryName = ""
            state.checkCategories = []
            state.categoryCurrentName = ""
        }
    },
    extraReducers: builder => {
        builder.addCase(getCategoriesThunk.pending, (state) => {
            state.isCategoriesLoading = true;
        })
        builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
            state.isCategoriesLoading = false;
            state.categories = action.payload.map(x => mapCategoryToModel(x))
            return state;
        })
        builder.addCase(getCategoriesThunk.rejected, (state, action) => {
            state.isCategoriesLoading = false;
            console.log(`Can't get categories identities. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(updateCategoryNameThunk.fulfilled, (state) => {
            if(state.selectedCategory !== null) {
                const category = findCategory(state.categories, state.selectedCategory.id);
                if(category !== null) {
                    category.name = state.categoryCurrentName;
                    state.selectedCategory.name = state.categoryCurrentName;
                }
            }
        })
        builder.addCase(updateCategoryNameThunk.rejected, (state, action) => {
            console.log(`Can't update category name. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(createCategoryThunk.fulfilled, (state, action) => {
            if(action.meta.arg.parentId == null) {
                const baseParent = action.meta.arg.catalogGroup == CatalogGroup.Printed ? 0 : 2000;
                const parentId = action.meta.arg.parentId ?? baseParent;
                state.categories.unshift(createCategory(parentId, action.payload, action.meta.arg.name))
            }
            else {
                const category = findCategory(state.categories, action.meta.arg.parentId);
                category!.children.push(createCategory(action.meta.arg.parentId, action.payload, action.meta.arg.name))
                //после добавления новой категории - выставляем selected заново, чтобы у selected были children
                state.selectedCategory = category
            }
            state.newCategoryName = ""
        })
        builder.addCase(createCategoryThunk.rejected, (state, action) => {
            console.log(`Can't create category. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(deleteCategoryThunk.fulfilled, (state, action) => {
            const category = findCategory(state.categories, action.meta.arg.id);
            if(category !== null) {
                if(category.parentId !== 0) {
                    const parent = findCategory(state.categories, category.parentId);
                    if(parent !== null) {
                        parent.children = parent.children.filter(x => x.id !== category.id);
                    }
                }
                else {
                    state.categories = state.categories.filter(x => x.id !== category.id);
                }
                //после удаления категории нужно выставить selected = null
                if(state.selectedCategory !== null && state.selectedCategory.id === category.id) {
                    state.selectedCategory = null;
                    state.categoryCurrentName = "";
                }
            }
        })
        builder.addCase(deleteCategoryThunk.rejected, (state, action) => {
            console.log(`Can't remove category. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
            if(action.payload?.statusCode === 403)
                alert(action.payload.exception)
        })

        //Реагируем на присвоение продуктовой группы категориям на странице categories
        builder.addCase(addProductGroupToCatsThunk.fulfilled, (state) => {
            state.checkCategories.forEach(x => {
                const category = findCategory(state.categories, x.id)
                if(category !== null) {
                    category.checked = false;
                }
            })
            state.checkCategories=[];
        })
    }
})


function createCategory(parentId: number, id: number, name: string): ICategoryIdentityModel {
    return {
        name: name,
        id: id,
        checked: false,
        children: [],
        selected: false,
        parentId: parentId,
    }
}

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