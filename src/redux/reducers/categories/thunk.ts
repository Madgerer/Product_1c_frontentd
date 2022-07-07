import Api from "../../../api";
import {createApiThunk} from "../../createApiThunk";

export const getCategoriesThunk = createApiThunk({
    typePrefix: "get/categories",
    apiCall: Api.category.getCategoriesByCatalogGroups
})

export const updateCategoryNameThunk = createApiThunk({
    typePrefix: "update/categories-name",
    apiCall: Api.category.updateCategoryName
})

export const createCategoryThunk = createApiThunk({
    typePrefix: "create/category",
    apiCall: Api.category.createCategory
})

export const deleteCategoryThunk = createApiThunk({
    typePrefix: "delete/category",
    apiCall: Api.category.deleteCategory
})