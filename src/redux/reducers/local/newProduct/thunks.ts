import {createApiThunk, createNoArgsApiThunk} from "../../../createApiThunk";
import Api from "../../../../api";

export const getSignsThunk = createNoArgsApiThunk({
    typePrefix: 'new-product/get-signs',
    apiCall: Api.sign.getSigns
})

export const getSeriesThunk = createNoArgsApiThunk({
    typePrefix: 'new-product/get-series',
    apiCall: Api.series.getSeries
})

export const getAttributesThunk = createApiThunk({
    typePrefix: 'new-product/get-attributes',
    apiCall: Api.attributes.getAttributes
})

export const getPriceGroupsThunk = createNoArgsApiThunk({
    typePrefix: 'new-product/get-price-groups',
    apiCall: Api.priceGroup.getPriceGroups
})

export const getOrReserveThunk = createApiThunk({
    typePrefix: 'new-product/get-or-reserve-product-group',
    apiCall: Api.productGroups.getOrReserve
})

export const getCategoriesThunk = createApiThunk({
    typePrefix: 'new-product/get-categories',
    apiCall: Api.category.getCategoriesByCatalogGroups
})

export const getProductGroupCategoriesThunk = createApiThunk({
    typePrefix: 'new-product/get-product-group-cats',
    apiCall: Api.category.getProductGroupCats
})

export const addProductGroupToCatsThunk = createApiThunk({
    typePrefix: 'new-product/add-product-group-to-cat',
    apiCall: Api.category.addProductGroupToCats
})

export const removeProductGroupFromCatsThunk = createApiThunk({
    typePrefix: 'new-product/remove-product-group-from-cat',
    apiCall: Api.category.removeProductGroupsFromCats
})

export const changeProductGroupCategoryThunk = createApiThunk({
    typePrefix: 'new-product/change-product-group-cat',
    apiCall: Api.category.changeProductGroupCategory
})

export const createProductGroupThunk = createApiThunk({
    typePrefix: 'new-product/create-product-group',
    apiCall: Api.productGroups.createProductGroup
})

export const discardReserveThunk = createApiThunk({
    typePrefix: 'new-product/discard-reserve',
    apiCall: Api.productGroups.discardReserve
})

export const deleteProductGroupThunk = createApiThunk({
    typePrefix: 'new-product/delete-product-group',
    apiCall: Api.productGroups.deleteProductGroup
})