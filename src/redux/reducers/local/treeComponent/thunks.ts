import Api from "../../../../api";
import {createApiThunk} from "../../../createApiThunk";

export const getProductGroupsBasicThunk = createApiThunk({
    typePrefix: "tree-page/get-product-groups",
    apiCall: Api.productGroups.getProductsGroupsByCategory
})