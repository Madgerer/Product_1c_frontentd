import {createApiThunk} from "../../../../createApiThunk";
import Api from "../../../../../api";

export const getAllRecommendationThunk = createApiThunk({
    typePrefix: 'new-product/get-all-rec',
    apiCall: Api.product.getAllRecommendations
})

export const getGroupRecommendationThunk = createApiThunk({
    typePrefix: 'new-product/get-group-rec',
    apiCall: Api.product.getGroupRecommendations
})

export const addRecommendationThunk = createApiThunk({
    typePrefix: 'new-product/add-rec',
    apiCall: Api.product.addRecommendation
})


export const removeRecommendationThunk = createApiThunk({
    typePrefix: 'new-product/remove-rec',
    apiCall: Api.product.removeRecommendation
})


export const swapRecommendationSortThunk = createApiThunk({
    typePrefix: 'new-product/change-sort-rec',
    apiCall: Api.product.swapRecommendationSort
})

