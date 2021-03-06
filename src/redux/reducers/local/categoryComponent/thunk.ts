import Api from "../../../../api";
import {createApiThunk} from "../../../createApiThunk";

export const getProductGroupsByCatalogsThunk = createApiThunk({
    typePrefix: "category-page/get-product-groups",
    apiCall: Api.productGroups.getProductsGroupsFromCatalog
})

export const getProductsByGroupThunk = createApiThunk({
    typePrefix: "categoryPage/get-product-by-group",
    apiCall: Api.product.getProductsIdentityByGroup
})

export const getProductGroupCatsThunk = createApiThunk({
    typePrefix: "get/product-group-cats",
    apiCall: Api.category.getProductGroupCats
})

export const addProductGroupToCatsThunk = createApiThunk({
    typePrefix: "add/product-groups-to-cats",
    apiCall: Api.category.addProductGroupToCats
})