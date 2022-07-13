import {ISelectableIndexModel} from "../../../../types";
import {CatalogGroup, ICategory} from "../../../../../domain/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import CategoryTreeUtils from "../../../../../CategoryTreeUtils";
import {
    addProductGroupToCatsThunk,
    changeProductGroupCategoryThunk,
    getCategoriesThunk,
    getProductGroupCategoriesThunk, removeProductGroupFromCatsThunk
} from "../thunks";

export type CategoriesTabState = {
    //текущие категории, которые есть у группы продуктов
    currentPrintedCategories: ISelectableIndexModel<ICategory>[],
    currentWebCategories: ISelectableIndexModel<ICategory>[],

    //все категории
    categoriesWeb: ICategory[],
    categoriesPrinted: ICategory[],

    //выбранная категория в ряду
    webCategoryToAlterPath: ICategory[]
    printedCategoryToAlterPath: ICategory[]
    shouldResetPrinted: boolean,
    shouldResetWeb: boolean

    //выбранная категория в таблице
    selectedPrintedCategory: ICategory | null,
    selectedWebCategory: ICategory | null
}

const INITIAL_STATE: CategoriesTabState = {
    webCategoryToAlterPath: [],
    categoriesPrinted: [],
    categoriesWeb: [],
    printedCategoryToAlterPath: [],
    currentPrintedCategories: [],
    currentWebCategories: [],
    selectedWebCategory: null,
    selectedPrintedCategory: null,
    shouldResetPrinted: false,
    shouldResetWeb: false
}

const slice = createSlice({
    name: 'new-product-cat-tab',
    initialState: INITIAL_STATE,
    reducers: {
        setSelectedCategory(state: CategoriesTabState, action: PayloadAction<{rowIndex: number, catalogGroup: CatalogGroup}>) {
            let categoryFound = false;
            if(action.payload.catalogGroup === CatalogGroup.Printed) {
                for (const row of state.currentPrintedCategories) {
                    if(row.index == action.payload.rowIndex)
                    {
                        row.selected = true
                        categoryFound = true;
                        //значения в ряду отфильтрованы, поэтому мы можем брать последний элемент
                        state.selectedPrintedCategory = row.model[row.model.length - 1];
                    }
                    else
                        row.selected = false
                }
                if(!categoryFound)
                    state.selectedPrintedCategory = null
            }
            else {
                for (const row of state.currentWebCategories) {
                    if(row.index == action.payload.rowIndex)
                    {
                        row.selected = true
                        categoryFound = true;
                        //значения в ряду отфильтрованы, поэтому мы можем брать последний элемент
                        state.selectedWebCategory = row.model[row.model.length - 1];
                    }
                    else
                        row.selected = false
                }
                if(!categoryFound)
                    state.selectedPrintedCategory = null
            }
        },
        setShouldReset(state: CategoriesTabState, action: PayloadAction<CatalogGroup>) {
            if(action.payload === CatalogGroup.Printed)
                state.shouldResetPrinted = !state.shouldResetPrinted
            else
                state.shouldResetWeb = !state.shouldResetWeb
        },
        setRowPath(state: CategoriesTabState, action: PayloadAction<{category: ICategory | null, catalogGroup: CatalogGroup}>) {
            if(action.payload.category === null) {
                return;
            }
            if (action.payload.catalogGroup === CatalogGroup.Printed) {
                if(action.payload.category.children.length === 0) {
                    state.printedCategoryToAlterPath = CategoryTreeUtils.getCategoriesByParent(action.payload.category.id, state.categoriesPrinted);
                }
                else
                    state.printedCategoryToAlterPath = []
            } else {
                if(action.payload.category.children.length === 0) {
                    state.webCategoryToAlterPath = CategoryTreeUtils.getCategoriesByParent(action.payload.category.id, state.categoriesPrinted);
                }
                else
                    state.webCategoryToAlterPath = []
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(getCategoriesThunk.rejected, (state, action) => {
            console.log(`Can't load categories. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(getProductGroupCategoriesThunk.fulfilled, (state, action) => {
            switch (action.meta.arg.catalogGroup) {
                case CatalogGroup.Web:
                    state.currentWebCategories = action.payload.map((x, i) => {
                        return {
                            selected: false,
                            index: i,
                            model: x.categoryPath.map(y => CategoryTreeUtils
                                .findCategory(y, state.categoriesWeb))
                                .filter(x => x != null)
                                .map(x => x!)
                                .reverse()
                        }
                    })
                    break;
                case CatalogGroup.Printed:
                    state.currentPrintedCategories = action.payload.map((x, i) => {
                        return {
                            index: i,
                            selected: false,
                            model: x.categoryPath.map(y => CategoryTreeUtils
                                .findCategory(y, state.categoriesPrinted))
                                .filter(x => x != null)
                                .map(x => x!)
                                .reverse()
                        }
                    });
                    break;
            }
        })

        builder.addCase(getProductGroupCategoriesThunk.rejected, (state, action) => {
            console.log(`Can't load product group categories. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
            if(action.meta.arg.catalogGroup == CatalogGroup.Printed)
                state.categoriesPrinted = action.payload
            else
                state.categoriesWeb = action.payload
        })

        builder.addCase(changeProductGroupCategoryThunk.fulfilled, (state, action) => {
            //const originalState = original(state)!;
            if(action.meta.arg.catalogGroup == CatalogGroup.Printed) {
                const indexToChange: number = state.currentPrintedCategories.findIndex(x => {
                    for(let category of x.model) {
                        if(category.id === action.meta.arg.categoryId)
                            return true;
                    }
                    return false;
                })
                const newCategoryRow = CategoryTreeUtils.getCategoriesByParent(action.meta.arg.newCategoryId, state.categoriesPrinted)
                const newRow = {
                    index: indexToChange,
                    model: newCategoryRow.map(x => {
                        return {
                            id: x.id,
                            name: x.name,
                            parentId: x.parentId,
                            children: x.children
                        }
                    }),
                    selected: true
                };
                state.currentPrintedCategories.splice(indexToChange, 1, newRow)
                state.selectedPrintedCategory = newRow.model[newRow.model.length - 1]
            } else {
                const indexToChange: number = state.currentPrintedCategories.findIndex(x => {
                    for(let category of x.model) {
                        if(category.id === action.meta.arg.categoryId)
                            return true;
                    }
                    return false;
                })
                const newCategoryRow = CategoryTreeUtils.getCategoriesByParent(action.meta.arg.newCategoryId, state.categoriesWeb)
                const newRow = {
                    index: indexToChange,
                    model: newCategoryRow.map(x => {
                        return {
                            id: x.id,
                            name: x.name,
                            parentId: x.parentId,
                            children: x.children
                        }
                    }),
                    selected: true
                };
                state.currentWebCategories.splice(indexToChange, 1, newRow)
                state.selectedWebCategory = newRow.model[newRow.model.length - 1]
            }
        })

        builder.addCase(addProductGroupToCatsThunk.fulfilled, (state, action) => {
            if(action.meta.arg.catalogGroup == CatalogGroup.Printed) {
                //чтобы не перерасчитывать индексы всех рядов - просто отправляем индекс в минус,
                //он нужен только для внутренних вычислений, поэтому без разницы какой он
                state.currentPrintedCategories.unshift({
                    index: state.currentPrintedCategories.length !== 0
                        ? state.currentPrintedCategories[0].index - 1
                        : 0,
                    model: state.printedCategoryToAlterPath,
                    selected: false
                })
                state.shouldResetPrinted = true
                state.printedCategoryToAlterPath = []
            } else {
                state.currentWebCategories.unshift({
                    index: state.currentWebCategories.length !== 0
                        ? state.currentWebCategories[0].index - 1
                        : 0,
                    model: state.webCategoryToAlterPath,
                    selected: false
                })
                state.shouldResetWeb = true
                state.webCategoryToAlterPath = []
            }

        })
        builder.addCase(addProductGroupToCatsThunk.rejected, (state, action) => {
            console.log(`Can't discard reserve product. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(removeProductGroupFromCatsThunk.fulfilled, (state, action) => {
            if(action.meta.arg.catalogGroup === CatalogGroup.Printed) {
                state.currentPrintedCategories = state.currentPrintedCategories
                    .filter(x => x.model[x.model.length - 1].id !== action.meta.arg.categoryId);
            }
            else
                state.currentWebCategories = state.currentWebCategories
                    .filter(x => x.model[x.model.length - 1].id !== action.meta.arg.categoryId);
        })
        builder.addCase(removeProductGroupFromCatsThunk.rejected, (state, action) => {
            console.log(`Can't discard reserve product. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const actions = slice.actions;
const reducer = slice.reducer;

export {actions, reducer}