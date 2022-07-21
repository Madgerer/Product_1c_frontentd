import {
    IAttribute,
    IPriceGroup,
    IProductGroup,
    ISeries,
    ISign
} from "../../../../domain/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    createProductGroupThunk,
    deleteProductGroupThunk,
    discardReserveThunk,
    getAttributesThunk,
    getOrReserveThunk,
    getPriceGroupsThunk,
    getSeriesThunk,
    getSignsThunk, updateProductGroupThunk
} from "./thunks";
import {combineReducers} from "redux";
import {reducer as catTabReducer} from "./categoryTabComponent";
import {reducer as tableTabReducer} from "./tablePartComponent";
import {reducer as graphicTabReducer} from "./graphicTabComponent";
import {reducer as additionalInfoReducer} from "./additionalInfoComponent";

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
    loadingState: INewProductLoadingState,
    isPriceGroupChanged: boolean,
    initialPriceGroupId: number | null
}

interface INewProductLoadingState {
    isSaveLoading: boolean,
    isRejectLoading: boolean,
    isPageLoading: boolean
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
        priceGroupId: 0,
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
    loadingState: {
        isRejectLoading: false,
        isSaveLoading: false,
        isPageLoading: true
    },
    isPriceGroupChanged: false,
    initialPriceGroupId: null
}

const slice = createSlice({
    name: 'new-product',
    initialState: INITIAL_STATE,
    reducers: {

        setId(state: NewProductState, action: PayloadAction<string>) {
            state.productGroup.id = action.payload
        },
        setName(state: NewProductState, action: PayloadAction<string>) {
            state.productGroup.name = action.payload
        },
        setIsToolset(state: NewProductState, action: PayloadAction<boolean>) {
            state.productGroup.isToolset = action.payload
        },
        setIsImageChecked(state: NewProductState, action: PayloadAction<boolean>) {
            state.productGroup.isImageChecked = action.payload
        },
        setIsDescrChecked(state: NewProductState, action: PayloadAction<boolean>) {
            state.productGroup.isDescriptionChecked = action.payload
        },
        setSelectedSeries(state: NewProductState, action: PayloadAction<number | null>) {
            const series = state.series.find(x => x.id == action.payload);
            if(series === undefined) {
                state.selectedSeries = null;
            }else {
                state.selectedSeries = series;
            }
            state.productGroup.seriesId = state.selectedSeries?.id ?? null
        },
        setSelectedSign(state: NewProductState, action: PayloadAction<number | null>) {
            const series = state.signs.find(x => x.id == action.payload);
            if(series === undefined) {
                state.selectedSign = null;
            }else {
                state.selectedSign = series;
            }
            state.productGroup.signId = state.selectedSign?.id ?? null
        },
        setSelectedAttribute(state: NewProductState, action: PayloadAction<number | null>) {
            const attribute = state.attributes.find(x => x.id == action.payload);
            if(attribute === undefined) {
                state.selectedAttribute = null;
            }else {
                state.selectedAttribute = attribute;
            }
            state.productGroup.mainAttributeId = state.selectedAttribute?.id ?? null
        },
        setSelectedPriceGroup(state: NewProductState, action: PayloadAction<number | null>) {
            const priceGroup = state.priceGroups.find(x => x.id == action.payload);
            if(priceGroup === undefined) {
                state.selectedPriceGroup = null;
            } else {
                state.selectedPriceGroup = priceGroup;
            }
            state.productGroup.priceGroupId = state.selectedPriceGroup?.id ?? 0
            state.isPriceGroupChanged = state.productGroup.priceGroupId != state.initialPriceGroupId;

        },
        setDescription(state: NewProductState, action: PayloadAction<string>) {
            state.productGroup.description = action.payload
        },
        setWebDescription(state: NewProductState, action: PayloadAction<string>) {
            state.productGroup.descriptionWeb = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getSignsThunk.fulfilled, (state, action) => {
            state.signs = action.payload
            state.selectedSign = action.payload.find(x => x.id === state.productGroup.signId) ?? null
        })
        builder.addCase(getSignsThunk.rejected, (state, action) => {
            console.log(`Can't load signs. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(getSeriesThunk.fulfilled, (state, action) => {
            state.series = action.payload
            state.selectedSeries = action.payload.find(x => x.id === state.productGroup.seriesId) ?? null
        })
        builder.addCase(getSeriesThunk.rejected, (state, action) => {
            console.log(`Can't load series. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(getAttributesThunk.fulfilled, (state, action) => {
            state.attributes = action.payload
            state.selectedAttribute = action.payload.find(x => x.id === state.productGroup.mainAttributeId) ?? null
        })
        builder.addCase(getAttributesThunk.rejected, (state, action) => {
            console.log(`Can't load signs. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(getPriceGroupsThunk.fulfilled, (state, action) => {
            state.priceGroups = action.payload
            state.selectedPriceGroup = action.payload.find(x => x.id === state.productGroup.priceGroupId) ?? null
        })
        builder.addCase(getPriceGroupsThunk.rejected, (state, action) => {
            console.log(`Can't load signs. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(getOrReserveThunk.pending, (state) => {
            state.loadingState.isPageLoading = true
        })
        builder.addCase(getOrReserveThunk.fulfilled, (state, action) => {
            state.productGroup = action.payload
            state.initialPriceGroupId = action.payload.priceGroupId
            state.loadingState.isPageLoading = false
        })
        builder.addCase(getOrReserveThunk.rejected, (state, action) => {
            state.loadingState.isPageLoading = false
            console.log(`Can't load signs. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
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
            if(action.payload?.statusCode === 409)
                alert("Группа продуктов с таким id уже создана")
            else
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

        builder.addCase(updateProductGroupThunk.pending, (state) => {
            state.loadingState.isSaveLoading = true;
        })
        builder.addCase(updateProductGroupThunk.fulfilled, (state) => {
            state.loadingState.isSaveLoading = false;
            state.isPriceGroupChanged = false;
        })
        builder.addCase(updateProductGroupThunk.rejected, (state, action) => {
            state.loadingState.isSaveLoading = false;
            console.log(`Can't update product group. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const actions = slice.actions;
const reducer = combineReducers({
    common: slice.reducer,
    categoryState: catTabReducer,
    tableTabState: tableTabReducer,
    graphicTabState: graphicTabReducer,
    additionalInfoState: additionalInfoReducer
});

export {actions, reducer}