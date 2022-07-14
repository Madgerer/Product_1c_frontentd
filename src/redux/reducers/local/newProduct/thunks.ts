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