import Api from "../../../../../api";
import {createApiThunk} from "../../../../createApiThunk";

export const getProductGroupsIdentityThunk = createApiThunk({
    typePrefix: "product-page/get-product-groups",
    apiCall: Api.productGroups.getProductsGroupsIdentity
})

export const getProductByProductGroupThunk = createApiThunk({
    typePrefix: "product-page/get-product-by-group",
    apiCall: Api.product.getProductsIdentityByGroup
})