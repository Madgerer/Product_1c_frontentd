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

export const getProductGroupCatalogsThunk = createApiThunk({
    typePrefix: 'new-product/get-group-catalogs',
    apiCall: Api.catalogs.getProductGroupCatalogs
})

export const isProductOnSiteThunk = createApiThunk({
    typePrefix: 'new-product/is-on-site',
    apiCall: Api.websites.isOnSite
})

export const addGroupToSiteThunk = createApiThunk({
    typePrefix: 'new-product/add-to-site',
    apiCall: Api.websites.addGroupToSite
})

export const removeGroupFromSiteThunk = createApiThunk({
    typePrefix: 'new-product/remove-from-site',
    apiCall: Api.websites.removeFromSite
})

export const changeShowStatusThunk = createApiThunk({
    typePrefix: 'new-product/change-show-status',
    apiCall: Api.catalogs.changeShowStatus
})