import Api from "../../../../../api";
import {createApiThunk} from "../../../../createApiThunk";

export const getProductIdentityThunk  = createApiThunk({
    typePrefix: 'product-page/get-products',
    apiCall: Api.product.getProductsIdentityWithoutGroup
});

export const addProductToGroupAsyncThunk = createApiThunk({
    typePrefix: 'product-page/add-products-to-group',
    apiCall: Api.productGroups.addProductToGroupAsync
})