import {IAttribute, IPriceGroup, IProductGroup, ISeries, ISign} from "../../../../domain/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAttributesThunk, getPriceGroupsThunk, getSeriesThunk, getSignsThunk} from "./thunks";

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
    selectedPriceGroup: INITIAL_PRICEGROUPS[0]
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
            const series = state.attributes.find(x => x.id == action.payload);
            if(series === undefined) {
                state.selectedAttribute = null;
            }else {
                state.selectedAttribute = series;
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
            state.attributes = action.payload
            state.selectedPriceGroup = null
        })
        builder.addCase(getPriceGroupsThunk.rejected, (state, action) => {
            console.log(`Can't load signs. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const actions = slice.actions;
const reducer = slice.reducer;

export {actions, reducer}