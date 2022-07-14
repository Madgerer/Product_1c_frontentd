import {createApiThunk} from "../../../../createApiThunk";
import Api from "../../../../../api";

export const getCategoriesThunk = createApiThunk({
    typePrefix: 'new-product/get-categories',
    apiCall: Api.category.getCategoriesByCatalogGroups
})

export const getProductGroupCategoriesThunk = createApiThunk({
    typePrefix: 'new-product/get-product-group-cats',
    apiCall: Api.category.getProductGroupCats
})

export const addProductGroupToCatsThunk = createApiThunk({
    typePrefix: 'new-product/add-product-group-to-cat',
    apiCall: Api.category.addProductGroupToCats
})

export const removeProductGroupFromCatsThunk = createApiThunk({
    typePrefix: 'new-product/remove-product-group-from-cat',
    apiCall: Api.category.removeProductGroupsFromCats
})

export const changeProductGroupCategoryThunk = createApiThunk({
    typePrefix: 'new-product/change-product-group-cat',
    apiCall: Api.category.changeProductGroupCategory
})

export const setCategoryAsMainThunk = createApiThunk({
    typePrefix: 'new-product/set-category-as-main',
    apiCall: Api.category.setCategoryAsMain
})