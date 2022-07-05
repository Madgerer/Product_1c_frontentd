import Api from "../../../../../api";
import {createApiThunk} from "../../../../createApiThunk";

export const getProductIdentityThunk  = createApiThunk({
    typePrefix: 'product-page/get-products1',
    apiCall: Api.product.getProductsIdentityWithoutGroup
});