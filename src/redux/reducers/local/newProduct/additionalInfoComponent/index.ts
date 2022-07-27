import {IProductBase, IProductGroupCatalog, IProductIdentity} from "../../../../../domain/types";
import {ISelectable} from "../../../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
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
    isRecommendationsLoading: boolean,

    groupRecommendations: GroupRecommendation [],
    selectedGroupRecommendation: GroupRecommendation | null,

    groupCatalogs: IProductGroupCatalog[]
}

const ALL_RECOMMENDATIONS_STATE: IProductIdentity[] = [{id: '-1', name: 'loading', priceGroupId: 0}]
const INITIAL_STATE: AdditionalInfoState = {
    allRecommendations: ALL_RECOMMENDATIONS_STATE,
    selectedRecommendation: ALL_RECOMMENDATIONS_STATE[0],
    isRecommendationsLoading: false,

    groupRecommendations: [],
    selectedGroupRecommendation: null,

    groupCatalogs: []
}

const slice = createSlice({
    name: 'new-product-add-tab',
    initialState: INITIAL_STATE,
    reducers: {
        setSelectedRec(state: AdditionalInfoState, action: PayloadAction<string>) {
            state.selectedRecommendation = state.allRecommendations.find(x => x.id === action.payload) ?? null
        },
        setSelectedGroupRec(state: AdditionalInfoState, action: PayloadAction<string>) {
            state.groupRecommendations.forEach(x => {
                if(x.id === action.payload) {
                    x.selected = true
                    state.selectedGroupRecommendation = x
                }
                else
                    x.selected = false
            })
            if(state.selectedGroupRecommendation?.id !== action.payload)
                state.selectedGroupRecommendation = null
        }
    },
    extraReducers: builder => {
        builder.addCase(getAllRecommendationThunk.pending, (state) => {
            state.isRecommendationsLoading = true
        })
        builder.addCase(getAllRecommendationThunk.fulfilled, (state, action) => {
            state.allRecommendations = action.payload
            state.selectedRecommendation = null
            state.isRecommendationsLoading = false
        })
        builder.addCase(getAllRecommendationThunk.rejected, (state, action) => {
            state.isRecommendationsLoading = false
            console.log(`Can't load recommendations. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(getGroupRecommendationThunk.fulfilled, (state, action) => {
            state.groupRecommendations = action.payload.map(x => {
                return {
                    id: x.id,
                    name: x.name,
                    sort: x.sort,
                    selected: false,
                    priceGroupId: x.priceGroupId
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
                priceGroupId: state.allRecommendations[index].priceGroupId,
                sort: maxId + 1,
                selected: false,
            })
            state.selectedRecommendation = null
            state.allRecommendations.splice(index, 1)
        })
        builder.addCase(addRecommendationThunk.rejected, (state, action) => {
            console.log(`Can't add recommendation. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(removeRecommendationThunk.fulfilled, (state, action) => {
            const index = state.groupRecommendations.findIndex(x => x.id === action.meta.arg.productId)
            const sort = state.groupRecommendations[index].sort!;
            state.groupRecommendations.forEach(x => {
                if(x.sort! > sort)
                    x.sort! -= 1;
            })
            if(state.allRecommendations.findIndex(x => x.id === state.groupRecommendations[index].id) === -1)
                state.allRecommendations.push({
                    id: state.groupRecommendations[index].id,
                    name: state.groupRecommendations[index].name,
                    priceGroupId: state.groupRecommendations[index].priceGroupId
                })
            state.groupRecommendations.splice(index, 1)
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
            state.selectedGroupRecommendation = first
        })
        builder.addCase(swapRecommendationSortThunk.rejected, (state, action) => {
            console.log(`Can't change sort. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const actions = slice.actions;
const reducer = slice.reducer;

export {actions, reducer}