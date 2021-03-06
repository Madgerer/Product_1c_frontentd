import Api from "../../../../api";
import {createApiThunk} from "../../../createApiThunk";

export const getProductGroupsBasicThunk = createApiThunk({
    typePrefix: "tree-page/get-product-groups",
    apiCall: Api.productGroups.getProductsGroupsByCategory
})

export const getProductsByGroupThunk = createApiThunk({
    typePrefix: "tree-page/get-product-by-group",
    apiCall: Api.product.getProductsIdentityByGroup
})

export const recountProductGroupSortThunk = createApiThunk({
    typePrefix: 'tree-page/recount-product-groups-sort',
    apiCall: Api.productGroups.recountProductGroupSort
})

export const changeProductGroupSortThunk = createApiThunk({
    typePrefix: 'tree-page/change-product-groups-sort',
    apiCall: Api.productGroups.changeProductGroupSort
})

export const removeProductGroupFromCatsThunk = createApiThunk({
    typePrefix: "add/remove-product-groups-from-cats",
    apiCall: Api.category.removeProductGroupsFromCats
})