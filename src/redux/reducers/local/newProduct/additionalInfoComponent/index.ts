import {IPictogram, IProductGroupCatalog, IProductIdentity, IRecommendation} from "../../../../../domain/types";
import {ISelectable} from "../../../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    addGroupToSiteThunk,
    addRecommendationThunk, changeShowStatusThunk,
    getAllRecommendationThunk,
    getGroupRecommendationThunk, getProductGroupCatalogsThunk, isProductOnSiteThunk, removeGroupFromSiteThunk,
    removeRecommendationThunk, swapRecommendationSortThunk
} from "./thunks";
import _ from "lodash";

export type GroupRecommendation = IRecommendation & ISelectable
export type GroupCatalog = IProductGroupCatalog & ISelectable

const areEqual = (f: GroupCatalog, s: GroupCatalog) => {
    return f.catalogId === s.catalogId
        && f.catalogCategoryId === s.catalogCategoryId
        && f.showStatus === s.showStatus
        && f.sort === s.sort
        && f.catalogName === f.catalogName
        && f.catalogParentCategoryId === s.catalogParentCategoryId
        && f.webCategoryId === s.webCategoryId
};

export type AdditionalInfoState = {
    allRecommendations: IProductIdentity[],
    selectedRecommendation: IProductIdentity | null,
    isRecommendationsLoading: boolean,

    groupRecommendations: GroupRecommendation [],
    selectedGroupRecommendation: GroupRecommendation | null,

    groupCatalogs: GroupCatalog[] ,
    isOnSite: boolean | null
}

const ALL_RECOMMENDATIONS_STATE: IProductIdentity[] = [{id: '-1', name: 'loading', priceGroupId: 0}]

const INITIAL_STATE: AdditionalInfoState = {
    allRecommendations: ALL_RECOMMENDATIONS_STATE,
    selectedRecommendation: ALL_RECOMMENDATIONS_STATE[0],
    isRecommendationsLoading: false,

    groupRecommendations: [],
    selectedGroupRecommendation: null,

    groupCatalogs: [],

    isOnSite: null
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
                if(x.productId === action.payload) {
                    x.selected = true
                    state.selectedGroupRecommendation = x
                }
                else
                    x.selected = false
            })
            if(state.selectedGroupRecommendation?.productId !== action.payload)
                state.selectedGroupRecommendation = null
        },
        setSelectedCatalog(state: AdditionalInfoState, action: PayloadAction<GroupCatalog>) {
            const catalog = state.groupCatalogs.find(x => areEqual(x, action.payload))
            if(catalog !== undefined)
                catalog.selected = !catalog.selected
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
            state.groupRecommendations = action.payload.recommendations.map(x => {
                return {
                    selected: false,
                    productId: x.productId,
                    sort: x.sort,
                    name: x.name
                }
            })
            state.selectedGroupRecommendation = null
        })
        builder.addCase(getGroupRecommendationThunk.rejected, (state, action) => {
            console.log(`Can't load group recommendations. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(addRecommendationThunk.fulfilled, (state, action) => {
            for (const productId of action.meta.arg.productsIds) {
                const index = state.allRecommendations.findIndex(x => x.id === productId)
                const maxId = _.maxBy(state.groupRecommendations, x => x.sort)?.sort ?? 0
                state.groupRecommendations.push({
                    productId: state.allRecommendations[index].id,
                    name: state.allRecommendations[index].name,
                    sort: maxId + 1,
                    selected: false,
                })
                state.selectedRecommendation = null
                state.allRecommendations.splice(index, 1)
            }
        })
        builder.addCase(addRecommendationThunk.rejected, (state, action) => {
            console.log(`Can't add recommendation. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(removeRecommendationThunk.fulfilled, (state, action) => {
            const index = state.groupRecommendations.findIndex(x => x.productId === action.meta.arg.productId)
            const sort = state.groupRecommendations[index].sort!;
            state.groupRecommendations.forEach(x => {
                if(x.sort! > sort)
                    x.sort! -= 1;
            })
            if(state.allRecommendations.findIndex(x => x.id === state.groupRecommendations[index].productId) === -1)
                state.allRecommendations.push({
                    id: state.groupRecommendations[index].productId,
                    name: state.groupRecommendations[index].name,
                    priceGroupId: state.allRecommendations[0]?.priceGroupId ?? 0
                })
            state.groupRecommendations.splice(index, 1)
            state.selectedGroupRecommendation = null
        })
        builder.addCase(removeRecommendationThunk.rejected, (state, action) => {
            console.log(`Can't remove recommendation. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(swapRecommendationSortThunk.fulfilled, (state, action) => {
            const first = state.groupRecommendations.find(x => x.productId === action.meta.arg.firstProductId)!
            const second = state.groupRecommendations.find(x => x.productId === action.meta.arg.secondProductId)!
            let temp = first.sort
            first.sort = second.sort
            second.sort = temp
            state.selectedGroupRecommendation = first
        })
        builder.addCase(swapRecommendationSortThunk.rejected, (state, action) => {
            console.log(`Can't change sort. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(getProductGroupCatalogsThunk.fulfilled, (state, action) => {
            state.groupCatalogs = action.payload.map(x => {
                return {
                    catalogName: x.catalogName,
                    sort: x.sort,
                    showStatus: x.showStatus,
                    catalogId: x.catalogId,
                    productGroupId: x.productGroupId,
                    catalogCategoryId: x.catalogCategoryId,
                    catalogParentCategoryId: x.catalogParentCategoryId,
                    webCategoryId: x.webCategoryId,
                    selected: false
                }
            })
        })
        builder.addCase(getProductGroupCatalogsThunk.rejected, (state, action) => {
            console.log(`Can't change sort. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(isProductOnSiteThunk.fulfilled, (state, action) => {
            state.isOnSite = action.payload
        })
        builder.addCase(isProductOnSiteThunk.rejected, (state, action) => {
            console.log(`Can't change sort. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(addGroupToSiteThunk.fulfilled, (state) => {
            state.isOnSite = !state.isOnSite
            alert('Товар добавлен')
        })
        builder.addCase(addGroupToSiteThunk.rejected, (state, action) => {
            if(action.payload?.statusCode == 409 || action.payload?.statusCode == 422)
                alert(action.payload.exception)
            console.log(`Can't change sort. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(removeGroupFromSiteThunk.fulfilled, (state) => {
            state.isOnSite = !state.isOnSite
            alert('Товар удален с сайта')
        })
        builder.addCase(removeGroupFromSiteThunk.rejected, (state, action) => {
            console.log(`Can't change sort. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(changeShowStatusThunk.fulfilled, (state, action) => {
            action.meta.arg.forEach(x => {
                const catalog = state.groupCatalogs.find(gc =>
                    gc.catalogId === x.catalogId &&
                    gc.catalogCategoryId === x.catalogCategoryId &&
                    gc.webCategoryId === x.webCategoryId)
                if(catalog !== undefined) {
                    catalog.showStatus = x.showStatus
                    catalog.selected = false
                }
            })
        })
        builder.addCase(changeShowStatusThunk.rejected, (state, action) => {
            console.log(`Can't change sort. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const actions = slice.actions;
const reducer = slice.reducer;

export {actions, reducer}