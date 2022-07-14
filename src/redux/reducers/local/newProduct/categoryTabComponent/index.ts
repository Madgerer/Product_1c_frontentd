import {ISelectable, ISelectableIndexModel} from "../../../../types";
import {CatalogGroup, ICategory, IScopeOfApplication} from "../../../../../domain/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import CategoryTreeUtils from "../../../../../CategoryTreeUtils";
import {
    addProductGroupsToScopeThunk,
    addProductGroupToCatsThunk,
    changeProductGroupCategoryThunk, changeProductGroupsScopeThunk,
    getCategoriesThunk,
    getProductGroupCategoriesThunk,
    getProductGroupsScopesThunk,
    getScopesOfApplicationThunk,
    removeProductGroupFromCatsThunk, removeProductGroupsFromScopeThunk,
    setCategoryAsMainThunk
} from "./thunks";
import _ from "lodash";


export type ProductGroupCategory = ICategory & { mainCategory: boolean | null}
export type ScopeOfApplication = IScopeOfApplication & ISelectable

export type CategoriesTabState = {
    //текущие категории, которые есть у группы продуктов
    currentPrintedCategories: ISelectableIndexModel<ProductGroupCategory>[],
    currentWebCategories: ISelectableIndexModel<ProductGroupCategory>[],

    //все категории
    categoriesWeb: ICategory[],
    categoriesPrinted: ICategory[],

    //выбранная категория в ряду
    webCategoryToAlterPath: ICategory[]
    printedCategoryToAlterPath: ICategory[]
    shouldResetPrinted: boolean,
    shouldResetWeb: boolean

    //выбранная категория в таблице
    selectedPrintedCategory: ProductGroupCategory | null,
    selectedWebCategory: ProductGroupCategory | null


    scopes: IScopeOfApplication[],
    selectedScope: IScopeOfApplication | null

    //Таблица скоупов
    currentScopes: ScopeOfApplication[],
    selectedCurrentScope: ScopeOfApplication | null
}

const INITIAL_SCOPES: ScopeOfApplication[] = [{id: -1, name: 'loading', selected: false, sort: null}]

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
    shouldResetWeb: false,

    scopes: INITIAL_SCOPES,
    selectedScope: INITIAL_SCOPES[0],
    currentScopes: [],
    selectedCurrentScope: null
}

const slice = createSlice({
    name: 'new-product-cat-tab',
    initialState: INITIAL_STATE,
    reducers: {
        setSelectedCategory(state: CategoriesTabState, action: PayloadAction<{rowIndex: number, catalogGroup: CatalogGroup}>) {
            let categoryFound = false;
            if(action.payload.catalogGroup === CatalogGroup.Printed) {
                for (const row of state.currentPrintedCategories) {
                    if(row.index === action.payload.rowIndex)
                    {
                        row.selected = true
                        categoryFound = true;
                        //значения в ряду отфильтрованы, поэтому мы можем брать последний элемент
                        const category = row.model[row.model.length - 1];
                        state.selectedPrintedCategory = {
                            mainCategory: null,
                            children: category.children,
                            name: category.name,
                            parentId: category.parentId,
                            id: category.id
                        }
                    }
                    else
                        row.selected = false
                }
                if(!categoryFound)
                    state.selectedPrintedCategory = null
                //отключаем выбранную веб категорию
                state.currentWebCategories.forEach(x => x.selected = false)
                state.selectedWebCategory = null;
            }
            else {
                for (const row of state.currentWebCategories) {
                    if(row.index === action.payload.rowIndex)
                    {
                        row.selected = true
                        categoryFound = true;
                        //значения в ряду отфильтрованы, поэтому мы можем брать последний элемент
                        const category = row.model[row.model.length - 1];
                        state.selectedWebCategory = {
                            mainCategory: category.mainCategory,
                            children: category.children,
                            name: category.name,
                            parentId: category.parentId,
                            id: category.id
                        }
                    }
                    else
                        row.selected = false
                }
                if(!categoryFound)
                    state.selectedPrintedCategory = null
                //отключаем выбранную категорию из каталога
                state.currentPrintedCategories.forEach(x => x.selected = false)
                state.selectedPrintedCategory = null;
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
                    state.webCategoryToAlterPath = CategoryTreeUtils.getCategoriesByParent(action.payload.category.id, state.categoriesWeb);
                }
                else
                    state.webCategoryToAlterPath = []
            }
        },
        setSelectedScope(state: CategoriesTabState, action: PayloadAction<number | null>) {
            if(action.payload === null)
                state.selectedScope = null

            const scope = state.scopes.find(x => x.id === action.payload)
            if(scope === undefined)
                state.selectedScope = null
            else
                state.selectedScope = scope
        },
        setSelectedCurrentScope(state: CategoriesTabState, action: PayloadAction<number>) {
            const index = state.currentScopes.findIndex(x => x.id === action.payload)
            if(index > -1)
            {
                state.currentScopes[index].selected = true
                state.selectedCurrentScope = state.currentScopes[index]
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(getCategoriesThunk.rejected, (state, action) => {
            console.log(`Can't load categories. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(getProductGroupCategoriesThunk.fulfilled, (state, action) => {
            switch (action.meta.arg.catalogGroup) {
                case CatalogGroup.Web:
                    state.currentWebCategories = action.payload.map((pg, i) => {
                        return {
                            selected: false,
                            index: i,
                            model: pg.categoryPath.map(y => CategoryTreeUtils
                                .findCategory(y, state.categoriesWeb))
                                .filter(x => x != null)
                                .map(x => {
                                    return {
                                        mainCategory: pg.mainCategory,
                                        children: x!.children,
                                        name: x!.name,
                                        parentId: x!.parentId,
                                        id: x!.id
                                    }
                                })
                                .reverse()
                        }
                    })
                    console.log(state.currentWebCategories)
                    break;
                case CatalogGroup.Printed:
                    state.currentPrintedCategories = action.payload.map((x, i) => {
                        return {
                            index: i,
                            selected: false,
                            model: x.categoryPath.map(y => CategoryTreeUtils
                                .findCategory(y, state.categoriesPrinted))
                                .filter(x => x != null)
                                .map(x => {
                                    return {
                                        mainCategory: null,
                                        children: x!.children,
                                        name: x!.name,
                                        parentId: x!.parentId,
                                        id: x!.id
                                    }
                                })
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
            if(action.meta.arg.catalogGroup === CatalogGroup.Printed)
                state.categoriesPrinted = action.payload
            else
                state.categoriesWeb = action.payload
        })

        builder.addCase(changeProductGroupCategoryThunk.fulfilled, (state, action) => {
            //const originalState = original(state)!;
            if(action.meta.arg.catalogGroup === CatalogGroup.Printed) {
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
                            children: x.children,
                            mainCategory: null
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
                const currentCategory = _.last(state.currentWebCategories[indexToChange].model);
                const newCategoryRow = CategoryTreeUtils.getCategoriesByParent(action.meta.arg.newCategoryId, state.categoriesWeb)
                const newRow = {
                    index: indexToChange,
                    model: newCategoryRow.map(x => {
                        return {
                            id: x.id,
                            name: x.name,
                            parentId: x.parentId,
                            children: x.children,
                            mainCategory: currentCategory!.mainCategory
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
                    model: state.printedCategoryToAlterPath.map(x => {
                        return {
                            id: x.id,
                            name: x.name,
                            parentId: x.parentId,
                            children: x.children,
                            mainCategory: null
                        }
                    }),
                    selected: false
                })
                state.shouldResetPrinted = true
                state.printedCategoryToAlterPath = []
            } else {
                state.currentWebCategories.unshift({
                    index: state.currentWebCategories.length !== 0
                        ? state.currentWebCategories[0].index - 1
                        : 0,
                    model: state.webCategoryToAlterPath.map(x => {
                        return {
                            id: x.id,
                            name: x.name,
                            parentId: x.parentId,
                            children: x.children,
                            mainCategory: state.currentWebCategories.length === 0
                        }
                    }),
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

        builder.addCase(setCategoryAsMainThunk.fulfilled, (state, action) => {
            state.currentWebCategories.forEach(x => {
                const last = _.last(x.model);
                if(last === undefined)
                    return;

                last.mainCategory = last.id === action.meta.arg.categoryId;
            })
        });
        builder.addCase(setCategoryAsMainThunk.rejected, (state, action) => {
            console.log(`Can't discard reserve product. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(getScopesOfApplicationThunk.fulfilled, (state, action) => {
            state.scopes = action.payload
            state.selectedScope = null
        });
        builder.addCase(getScopesOfApplicationThunk.rejected, (state, action) => {
            console.log(`Can't load scopes of applications. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(getProductGroupsScopesThunk.fulfilled, (state, action) => {
            state.currentScopes = action.payload.map(x => {
                    const scope = state.scopes.find(scope => scope.id == x.scopeId)
                    if(scope === undefined)
                        return null
                    return {
                        id: x.scopeId,
                        name: scope.name,
                        selected: false,
                        sort: scope.sort
                    }
                })
                .filter(x => x !== null)
                .map(x => x!)
        });
        builder.addCase(getProductGroupsScopesThunk.rejected, (state, action) => {
            console.log(`Can't load product group scopes of applications. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(addProductGroupsToScopeThunk.fulfilled, (state, action) => {
            const scopeId = action.meta.arg.scopeId;
            const scope = state.scopes.find(scope => scope.id == scopeId)
            if(scope === undefined)
                return;
            const maxSort: number = _.maxBy(state.scopes, s => s.sort)?.sort ?? 1;

            state.currentScopes.push({
                id: scopeId,
                name: scope.name,
                selected: false,
                sort: maxSort
            })
            state.selectedScope = null;
        });
        builder.addCase(getProductGroupsScopesThunk.rejected, (state, action) => {
            console.log(`Can't add product group to scope. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(removeProductGroupsFromScopeThunk.fulfilled, (state, action) => {
            const scopeId = action.meta.arg.scopeId;
            state.currentScopes = state.currentScopes.filter(x => x.id == scopeId);
            state.selectedCurrentScope = null
        });
        builder.addCase(removeProductGroupsFromScopeThunk.rejected, (state, action) => {
            console.log(`Can't remove product group from scope. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(changeProductGroupsScopeThunk.fulfilled, (state, action) => {
            const scopeId = action.meta.arg.scopeId;
            const newScopeId = action.meta.arg.newScopeId;
            const newScope = state.scopes.find(scope => scope.id == newScopeId);
            if(newScope === undefined)
                return;

            const index = state.currentScopes.findIndex(x => x.id == scopeId);
            if(index > -1) {
                state.currentScopes[index] = {
                    id: newScope.id,
                    name: newScope.name,
                    selected: true,
                    sort: newScope.sort
                };
            }
        });
        builder.addCase(changeProductGroupsScopeThunk.rejected, (state, action) => {
            console.log(`Can't change product group scope. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const actions = slice.actions;
const reducer = slice.reducer;

export {actions, reducer}