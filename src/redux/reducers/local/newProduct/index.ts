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
    createProductGroupThunk, deleteProductGroupThunk, discardReserveThunk,
    getAttributesThunk,
    getCategoriesThunk,
    getOrReserveThunk,
    getPriceGroupsThunk, getProductGroupCategoriesThunk,
    getSeriesThunk,
    getSignsThunk
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
    rowWebCategoryPath: ICategory[]
    rowPrintedCategoryPath: ICategory[],

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
        rowWebCategoryPath: [],
        categoriesPrinted: [],
        categoriesWeb: [],
        rowPrintedCategoryPath: [],
        currentPrintedCategories: [],
        currentWebCategories: [],
        selectedWebCategory: null,
        selectedPrintedCategory: null,
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
        setPrintedRowPath(state: NewProductState, action: PayloadAction<ICategory | null>) {
            if(action.payload !== null) {
                if(action.payload.children.length === 0) {
                    state.categoriesState.rowPrintedCategoryPath = CategoryTreeUtils.getCategoriesByParent(action.payload.id, state.categoriesState.categoriesPrinted);
                }
                else
                    state.categoriesState.rowPrintedCategoryPath = []
            }
        },
        setWebRowPath(state: NewProductState, action: PayloadAction<ICategory | null>) {
            if(action.payload !== null) {
                if(action.payload.children.length === 0) {
                    state.categoriesState.rowWebCategoryPath = CategoryTreeUtils.getCategoriesByParent(action.payload.id, state.categoriesState.categoriesWeb);
                }
                else
                    state.categoriesState.rowWebCategoryPath = []
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
            //чтобы не перерасчитывать индексы всех рядов - просто отправляем индекс в минус,
            //он нужен только для внутренних вычислений, поэтому без разницы какой он
            state.categoriesState.currentPrintedCategories.unshift({
                index: state.categoriesState.currentPrintedCategories.length !== 0
                    ? state.categoriesState.currentPrintedCategories[0].index - 1
                    : 0,
                model: state.categoriesState.rowPrintedCategoryPath,
                selected: false
            })
            state.categoriesState.rowPrintedCategoryPath = []
        })
        builder.addCase(addProductGroupToCatsThunk.rejected, (state, action) => {
            state.loadingState.isRejectLoading = false;
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