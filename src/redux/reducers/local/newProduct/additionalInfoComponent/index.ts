import {IProductBase, IProductIdentity} from "../../../../../domain/types";
import {ISelectable} from "../../../../types";
import {createSlice} from "@reduxjs/toolkit";
import {
    addRecommendationThunk,
    getAllRecommendationThunk,
    getGroupRecommendationThunk,
    removeRecommendationThunk, swapRecommendationSortThunk
} from "./thunks";
import _ from "lodash";

export type GroupRecommendation = IProductBase & ISelectable

export type AdditionalInfoState = {
    allRecommendations: IProductIdentity[],
    selectedRecommendation: IProductIdentity | null,

    groupRecommendations: GroupRecommendation [],
    selectedGroupRecommendation: GroupRecommendation | null,
}

const ALL_RECOMMENDATIONS_STATE: IProductIdentity[] = [{id: '-1', name: 'loading'}]
const INITIAL_STATE: AdditionalInfoState = {
    allRecommendations: ALL_RECOMMENDATIONS_STATE,
    selectedRecommendation: ALL_RECOMMENDATIONS_STATE[0],

    groupRecommendations: [],
    selectedGroupRecommendation: null
}

const slice = createSlice({
    name: 'new-product-add-tab',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllRecommendationThunk.fulfilled, (state, action) => {
            state.allRecommendations = action.payload
            state.selectedRecommendation = null
        })
        builder.addCase(getAllRecommendationThunk.rejected, (state, action) => {
            console.log(`Can't load recommendations. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(getGroupRecommendationThunk.fulfilled, (state, action) => {
            state.groupRecommendations = action.payload.map(x => {
                return {
                    id: x.id,
                    name: x.name,
                    sort: x.sort,
                    selected: false
                }
            })
            state.selectedGroupRecommendation = null
        })
        builder.addCase(getGroupRecommendationThunk.rejected, (state, action) => {
            console.log(`Can't load group recommendations. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(addRecommendationThunk.fulfilled, (state, action) => {
            const index = state.allRecommendations.findIndex(x => x.id === action.meta.arg.productId)
            const maxId = _.maxBy(state.groupRecommendations, x => x.sort)?.sort ?? 0
            state.groupRecommendations.push({
                id: state.allRecommendations[index].id,
                name: state.allRecommendations[index].name,
                sort: maxId + 1,
                selected: false
            })
            state.selectedRecommendation = null
            state.allRecommendations.splice(index, 1)
        })
        builder.addCase(addRecommendationThunk.rejected, (state, action) => {
            console.log(`Can't add recommendation. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(removeRecommendationThunk.fulfilled, (state, action) => {
            const rec = state.groupRecommendations.find(x => x.id === action.meta.arg.productId)!
            state.groupRecommendations = state.groupRecommendations.filter(x => x.id !== rec.id)
            state.allRecommendations.push({
                id: rec.id,
                name: rec.name
            })
            state.selectedGroupRecommendation = null
        })
        builder.addCase(removeRecommendationThunk.rejected, (state, action) => {
            console.log(`Can't remove recommendation. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(swapRecommendationSortThunk.fulfilled, (state, action) => {
            const first = state.groupRecommendations.find(x => x.id === action.meta.arg.firstProductId)!
            const second = state.groupRecommendations.find(x => x.id === action.meta.arg.secondProductId)!
            let temp = first.sort
            first.sort = second.sort
            second.sort = temp
        })
        builder.addCase(swapRecommendationSortThunk.rejected, (state, action) => {
            console.log(`Can't change sort. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const actions = slice.actions;
const reducer = slice.reducer;

export {actions, reducer}