import Api from "../../../api";
import {createApiThunk} from "../../createApiThunk";

export const getCategoriesThunk = createApiThunk({
    typePrefix: "get/categories",
    apiCall: Api.category.getCategoriesByCatalogGroups
})