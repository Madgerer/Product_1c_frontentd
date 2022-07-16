import {createApiThunk} from "../../../../createApiThunk";
import Api from "../../../../../api";

export const getAttributesThunk = createApiThunk({
    typePrefix: 'new-product/get-attributes',
    apiCall: Api.attributes.getAttributes
})

export const getProductsWithAttributes = createApiThunk({
    typePrefix: 'new-product/get-attributes',
    apiCall: Api.product.getProductsWithAttributes
})

export const addProductToProductGroupThunk = createApiThunk({
    typePrefix: 'new-product/add-product-to-grop',
    apiCall: Api.product.addProductToGroup
})

export const replaceProductInGroupThunk = createApiThunk({
    typePrefix: 'new-product/replace-products-in-group',
    apiCall: Api.product.replaceProductsInGroup
})

export const removeProductFromGroup = createApiThunk({
    typePrefix: 'new-product/remove-product-from-group',
    apiCall: Api.product.removeProductFromGroup
})

export const getProductsWithoutGroupThunk = createApiThunk({
    typePrefix: 'new-product/get-products-without-group',
    apiCall: Api.product.getProductsIdentityWithoutGroup
})

export const swapProductSortingThunk = createApiThunk({
    typePrefix: 'new-product/swap-product-sorting',
    apiCall: Api.product.swapProductSorting
})

export const addAttributeThunk = createApiThunk({
    typePrefix: 'new-product/add-attribute-to-product',
    apiCall: Api.productGroups.addAttribute
})

export const removeAttributeThunk = createApiThunk({
    typePrefix: 'new-product/remove-attribute-from-product',
    apiCall: Api.productGroups.removeAttribute
})

export const changeAttributeOrderingThunk = createApiThunk({
    typePrefix: 'new-product/change-attribute-ordering',
    apiCall: Api.productGroups.changeAttributeOrdering
})

export const changeAttributesValuesThunk = createApiThunk({
    typePrefix: 'new-product/change-attribute-values',
    apiCall: Api.product.changeAttributesValues
})