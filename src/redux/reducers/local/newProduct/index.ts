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
    getSignsThunk
} from "./thunks";
import {combineReducers} from "redux";
import {reducer as catTabReducer} from "./categoryTabComponent";
import {reducer as tableTabReducer} from "./tablePartComponent";

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
    isPriceGroupChanged: boolean
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
    loadingState: {
        isRejectLoading: false,
        isSaveLoading: false,
        isPageLoading: true
    },
    isPriceGroupChanged: false
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
            const priceGroup = state.priceGroups.find(x => x.id == action.payload);
            if(priceGroup === undefined) {
                state.selectedPriceGroup = null;
            }else {
                state.selectedPriceGroup = priceGroup;
                state.isPriceGroupChanged = priceGroup.id !== state.productGroup.priceGroupId;
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
            state.selectedPriceGroup = action.payload.find(x => x.id === 0)!
        })
        builder.addCase(getPriceGroupsThunk.rejected, (state, action) => {
            console.log(`Can't load signs. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
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
const reducer = combineReducers({
    common: slice.reducer,
    categoryState: catTabReducer,
    tableTabState: tableTabReducer
});

export {actions, reducer}