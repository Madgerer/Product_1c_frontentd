import {IPictogram, IProductGroup, IProductIdentity, IRecommendation} from "../../../../domain/types";
import {ISelectable} from "../../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addRecommendationsThunk, getAllPictogramsThunk, getAllRecommendationThunk, getOrReserveThunk} from "./thunks";

export type Recommendation = IProductIdentity & ISelectable

export type RecommendationsState = {
    pictograms: IPictogram[],
    selectedPictogram: IPictogram | null,
    recommendations: Recommendation[]
    searchString: string,
    productGroup: IProductGroup | null
}

const INITIAL_PICTOGRAMS: IPictogram[] = [{id: -1, name: 'loading', imageUrl: '', sort: -1, isSet: false}]

const INITIAL_STATE: RecommendationsState = {
    pictograms: INITIAL_PICTOGRAMS,
    selectedPictogram: INITIAL_PICTOGRAMS[0],
    searchString: "",
    recommendations: [],
    productGroup: null
}

const slice = createSlice({
    name: 'recommendations',
    initialState: INITIAL_STATE,
    reducers: {
        setSelectedPictogram(state: RecommendationsState, action: PayloadAction<number>) {
            const pictogram = state.pictograms.find(x => x.id === action.payload)
            state.selectedPictogram = pictogram!
        },
        setSelectedRecommendation(state: RecommendationsState, action: PayloadAction<string>) {
            const recommendation = state.recommendations.find(x => x.id === action.payload)
            if(recommendation === undefined)
                return
            recommendation.selected = !recommendation.selected
        }
    },
    extraReducers: builder => {
        builder.addCase(getOrReserveThunk.fulfilled, (state, action) => {
            state.productGroup = action.payload
        })
        builder.addCase(getOrReserveThunk.rejected, (state, action) => {
            console.log(`Can't load group. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(getAllRecommendationThunk.fulfilled, (state, action) => {
            state.recommendations = action.payload.map(x => {
                return {
                    id: x.id,
                    name: x.name,
                    priceGroupId: x.priceGroupId,
                    selected: false
                }
            })
        })
        builder.addCase(getAllRecommendationThunk.rejected, (state, action) => {
            console.log(`Can't load group recommendations. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(addRecommendationsThunk.fulfilled, (state, action) => {
            for (const productsId of action.meta.arg.productsIds) {
                const index = state.recommendations.findIndex(x => x.id === productsId)
                state.recommendations = state.recommendations.splice(index, 1)
            }
        })
        builder.addCase(addRecommendationsThunk.rejected, (state, action) => {
            console.log(`Can't add recommendations. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(getAllPictogramsThunk.fulfilled, (state, action) => {
            state.pictograms = action.payload
            state.selectedPictogram = null
        })
        builder.addCase(getAllPictogramsThunk.rejected, (state, action) => {
            console.log(`Can't add recommendations. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const actions = slice.actions;
const reducer = slice.reducer;

export {actions, reducer}
