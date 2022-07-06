import Api from "../../../../../api";
import {createApiThunk} from "../../../../createApiThunk";

export const getProductIdentityThunk  = createApiThunk({
    typePrefix: 'product-page/get-products',
    apiCall: Api.product.getProductsIdentityWithoutGroup
});