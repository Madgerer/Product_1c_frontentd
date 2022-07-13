import {
    CatalogGroup,
    IAttribute,
    ICategory,
    IPriceGroup,
    IProductGroup,
    ISeries,
    ISign
} from "../../../../domain/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    addProductGroupToCatsThunk,
    createProductGroupThunk,
    deleteProductGroupThunk,
    discardReserveThunk,
    getAttributesThunk,
    getCategoriesThunk,
    getOrReserveThunk,
    getPriceGroupsThunk,
    getProductGroupCategoriesThunk,
    getSeriesThunk,
    getSignsThunk,
    removeProductGroupFromCatsThunk
} from "./thunks";
import CategoryTreeUtils from "../../../../CategoryTreeUtils";
import {ISelectableIndexModel} from "../../../types";

export type NewProductState = {
    productGroup: IProductGroup,
    series: ISeries[],
    selectedSeries: ISeries | null
    signs: ISign[],
    selectedSign: ISign | null,
    attributes: IAttribute[],
    selectedAttribute: IAttribute | null,
    priceGroups: IPriceGroup[],
    selectedPriceGroup: IPriceGroup | null
    loadingState: INewProductLoadingState
    categoriesState: ICategoriesState
}


interface INewProductLoadingState {
    isSaveLoading: boolean,
    isRejectLoading: boolean,
    isPageLoading: boolean
}

interface ICategoriesState {
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

const INITIAL_SERIES: ISeries[] = [{id: 0, name: 'loading', imageUrl: '', titleEng: ''}]
const INITIAL_SIGNS: ISign[] = [{id: 0, name: 'loading', imageUrl: ''}]
const INITIAL_ATTRIBUTES: IAttribute[] = [{id: 0, name: 'loading'}]
const INITIAL_PRICEGROUPS: IAttribute[] = [{id: 0, name: 'loading'}]

const INITIAL_STATE: NewProductState = {
    productGroup:  {
        id: "",
        name: "",
        attributesColumnOrder: [],
        description: "",
        descriptionWeb: "",
        isToolset: false,
        isImageChecked: false,
        isDescriptionChecked: false,
        mainAttributeId: null,
        priceGroupId: null,
        sellmarkId: null,
        seriesId: null,
        signId: null,
        siteId: null,
        wasCreate: false
    },
    series: INITIAL_SERIES,
    selectedSeries: INITIAL_SERIES[0],
    signs: INITIAL_SIGNS,
    selectedSign: INITIAL_SIGNS[0],
    attributes: INITIAL_ATTRIBUTES,
    selectedAttribute: INITIAL_ATTRIBUTES[0],
    priceGroups: INITIAL_PRICEGROUPS,
    selectedPriceGroup: INITIAL_PRICEGROUPS[0],
    categoriesState: {
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
    },
    loadingState: {
        isRejectLoading: false,
        isSaveLoading: false,
        isPageLoading: true
    }
}

const slice = createSlice({
    name: 'new-product',
    initialState: INITIAL_STATE,
    reducers: {
        setSelectedCategory(state: NewProductState, action: PayloadAction<{rowIndex: number, catalogGroup: CatalogGroup}>) {
            let categoryFound = false;
            if(action.payload.catalogGroup === CatalogGroup.Printed) {
                for (const row of state.categoriesState.currentPrintedCategories) {
                    if(row.index == action.payload.rowIndex)
                    {
                        row.selected = true
                        categoryFound = true;
                        //значения в ряду отфильтрованы, поэтому мы можем брать последний элемент
                        state.categoriesState.selectedPrintedCategory = row.model[row.model.length - 1];
                    }
                    else
                        row.selected = false
                }
                if(!categoryFound)
                    state.categoriesState.selectedPrintedCategory = null
            }
            else {
                for (const row of state.categoriesState.currentWebCategories) {
                    if(row.index == action.payload.rowIndex)
                    {
                        row.selected = true
                        categoryFound = true;
                        //значения в ряду отфильтрованы, поэтому мы можем брать последний элемент
                        state.categoriesState.selectedWebCategory = row.model[row.model.length - 1];
                    }
                    else
                        row.selected = false
                }
                if(!categoryFound)
                    state.categoriesState.selectedPrintedCategory = null
            }
        },
        setShouldReset(state: NewProductState, action: PayloadAction<CatalogGroup>) {
            if(action.payload === CatalogGroup.Printed)
                state.categoriesState.shouldResetPrinted = !state.categoriesState.shouldResetPrinted
            else
                state.categoriesState.shouldResetWeb = !state.categoriesState.shouldResetWeb
        },
        setRowPath(state: NewProductState, action: PayloadAction<{category: ICategory | null, catalogGroup: CatalogGroup}>) {
            if(action.payload.category === null) {
                return;
            }
            if (action.payload.catalogGroup === CatalogGroup.Printed) {
                if(action.payload.category.children.length === 0) {
                    state.categoriesState.printedCategoryToAlterPath = CategoryTreeUtils.getCategoriesByParent(action.payload.category.id, state.categoriesState.categoriesPrinted);
                }
                else
                    state.categoriesState.printedCategoryToAlterPath = []
            } else {
                if(action.payload.category.children.length === 0) {
                    state.categoriesState.webCategoryToAlterPath = CategoryTreeUtils.getCategoriesByParent(action.payload.category.id, state.categoriesState.categoriesPrinted);
                }
                else
                    state.categoriesState.webCategoryToAlterPath = []
            }
        },
        setId(state: NewProductState, action: PayloadAction<string>) {
            state.productGroup.id = action.payload
        },
        setName(state: NewProductState, action: PayloadAction<string>) {
            state.productGroup.name = action.payload
        },
        setIsToolset(state: NewProductState) {
            state.productGroup.isToolset = !state.productGroup.isToolset
        },
        setIsImageChecked(state: NewProductState) {
            state.productGroup.isImageChecked = !state.productGroup.isImageChecked
        },
        setIsDescrChecked(state: NewProductState) {
            state.productGroup.isDescriptionChecked = !state.productGroup.isDescriptionChecked
        },
        setSelectedSeries(state: NewProductState, action: PayloadAction<number | null>) {
            const series = state.series.find(x => x.id == action.payload);
            if(series === undefined) {
                state.selectedSeries = null;
            }else {
                state.selectedSeries = series;
            }
        },
        setSelectedSign(state: NewProductState, action: PayloadAction<number | null>) {
            const series = state.signs.find(x => x.id == action.payload);
            if(series === undefined) {
                state.selectedSign = null;
            }else {
                state.selectedSign = series;
            }
        },
        setSelectedAttribute(state: NewProductState, action: PayloadAction<number | null>) {
            const attribute = state.attributes.find(x => x.id == action.payload);
            if(attribute === undefined) {
                state.selectedAttribute = null;
            }else {
                state.selectedAttribute = attribute;
            }
        },
        setSelectedPriceGroup(state: NewProductState, action: PayloadAction<number | null>) {
            const series = state.priceGroups.find(x => x.id == action.payload);
            if(series === undefined) {
                state.selectedPriceGroup = null;
            }else {
                state.selectedPriceGroup = series;
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(getSignsThunk.fulfilled, (state, action) => {
            state.signs = action.payload
            state.selectedSign = null
        })
        builder.addCase(getSignsThunk.rejected, (state, action) => {
            console.log(`Can't load signs. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(getSeriesThunk.fulfilled, (state, action) => {
            state.series = action.payload
            state.selectedSeries = null
        })
        builder.addCase(getSeriesThunk.rejected, (state, action) => {
            console.log(`Can't load series. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(getAttributesThunk.fulfilled, (state, action) => {
            state.attributes = action.payload
            state.selectedAttribute = null
        })
        builder.addCase(getAttributesThunk.rejected, (state, action) => {
            console.log(`Can't load signs. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(getPriceGroupsThunk.fulfilled, (state, action) => {
            state.priceGroups = action.payload
            state.selectedPriceGroup = null
        })
        builder.addCase(getPriceGroupsThunk.rejected, (state, action) => {
            console.log(`Can't load signs. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
            if(action.meta.arg.catalogGroup == CatalogGroup.Printed)
                state.categoriesState.categoriesPrinted = action.payload
            else
                state.categoriesState.categoriesWeb = action.payload
        })
        builder.addCase(getCategoriesThunk.rejected, (state, action) => {
            console.log(`Can't load categories. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(getProductGroupCategoriesThunk.fulfilled, (state, action) => {
            switch (action.meta.arg.catalogGroup) {
                case CatalogGroup.Web:
                    state.categoriesState.currentWebCategories = action.payload.map((x, i) => {
                        return {
                            selected: false,
                            index: i,
                            model: x.categoryPath.map(y => CategoryTreeUtils
                                .findCategory(y, state.categoriesState.categoriesWeb))
                                .filter(x => x != null)
                                .map(x => x!)
                                .reverse()
                        }
                    })
                    break;
                case CatalogGroup.Printed:
                    state.categoriesState.currentPrintedCategories = action.payload.map((x, i) => {
                        return {
                            index: i,
                            selected: false,
                            model: x.categoryPath.map(y => CategoryTreeUtils
                                .findCategory(y, state.categoriesState.categoriesPrinted))
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

        builder.addCase(getOrReserveThunk.pending, (state) => {
            state.loadingState.isPageLoading = true
        })
        builder.addCase(getOrReserveThunk.fulfilled, (state, action) => {
            state.productGroup = action.payload
            state.loadingState.isPageLoading = false
        })
        builder.addCase(getOrReserveThunk.rejected, (state, action) => {
            state.loadingState.isPageLoading = false
            console.log(`Can't load signs. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(addProductGroupToCatsThunk.fulfilled, (state, action) => {
            if(action.meta.arg.catalogGroup == CatalogGroup.Printed) {
                //чтобы не перерасчитывать индексы всех рядов - просто отправляем индекс в минус,
                //он нужен только для внутренних вычислений, поэтому без разницы какой он
                state.categoriesState.currentPrintedCategories.unshift({
                    index: state.categoriesState.currentPrintedCategories.length !== 0
                        ? state.categoriesState.currentPrintedCategories[0].index - 1
                        : 0,
                    model: state.categoriesState.printedCategoryToAlterPath,
                    selected: false
                })
                state.categoriesState.shouldResetPrinted = true
                state.categoriesState.printedCategoryToAlterPath = []
            } else {
                state.categoriesState.currentWebCategories.unshift({
                    index: state.categoriesState.currentWebCategories.length !== 0
                        ? state.categoriesState.currentWebCategories[0].index - 1
                        : 0,
                    model: state.categoriesState.webCategoryToAlterPath,
                    selected: false
                })
                state.categoriesState.shouldResetWeb = true
                state.categoriesState.webCategoryToAlterPath = []
            }

        })
        builder.addCase(addProductGroupToCatsThunk.rejected, (state, action) => {
            console.log(`Can't discard reserve product. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(removeProductGroupFromCatsThunk.fulfilled, (state, action) => {
            if(action.meta.arg.catalogGroup === CatalogGroup.Printed) {
                state.categoriesState.currentPrintedCategories = state.categoriesState.currentPrintedCategories
                    .filter(x => x.model[x.model.length - 1].id !== action.meta.arg.categoryId);
            }
            else
                state.categoriesState.currentWebCategories = state.categoriesState.currentWebCategories
                    .filter(x => x.model[x.model.length - 1].id !== action.meta.arg.categoryId);
        })
        builder.addCase(removeProductGroupFromCatsThunk.rejected, (state, action) => {
            console.log(`Can't discard reserve product. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(createProductGroupThunk.pending, (state) => {
            state.loadingState.isSaveLoading = true
        })
        builder.addCase(createProductGroupThunk.fulfilled, (state) => {
            state.productGroup.wasCreate = true
            state.loadingState.isSaveLoading = false
        })
        builder.addCase(createProductGroupThunk.rejected, (state, action) => {
            state.loadingState.isSaveLoading = false
            console.log(`Can't create product group. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(discardReserveThunk.pending, (state) => {
            state.loadingState.isRejectLoading = true
        })
        builder.addCase(discardReserveThunk.fulfilled, (state) => {
            state.loadingState.isRejectLoading = false;
        })
        builder.addCase(discardReserveThunk.rejected, (state, action) => {
            state.loadingState.isRejectLoading = false;
            console.log(`Can't discard reserve product. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(deleteProductGroupThunk.pending, (state) => {
            state.loadingState.isRejectLoading = true;
        })
        builder.addCase(deleteProductGroupThunk.fulfilled, (state) => {
            state.loadingState.isRejectLoading = false;
        })
        builder.addCase(deleteProductGroupThunk.rejected, (state, action) => {
            state.loadingState.isRejectLoading = false;
            console.log(`Can't delete product group. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const actions = slice.actions;
const reducer = slice.reducer;

export {actions, reducer}