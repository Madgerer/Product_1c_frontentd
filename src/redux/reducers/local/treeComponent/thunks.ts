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
