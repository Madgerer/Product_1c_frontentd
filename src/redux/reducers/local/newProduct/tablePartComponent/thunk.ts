import {createApiThunk} from "../../../../createApiThunk";
import Api from "../../../../../api";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {IRejectQueryThunk} from "../../../../types";
import {actions} from "../../../auth";
import {AppState} from "../../../index";
import {IProductWithAttributes} from "../../../../../domain/types";

export const getAttributesThunk = createApiThunk({
    typePrefix: 'new-product/get-attributes',
    apiCall: Api.attributes.getAttributes
})
/**
 * Этот thunk не создаем через createApiThunk т.к. нам необходимо получить данные о порядке колонок. Это можно сделать несколькими путями,
 * но этот наиболее простой и "right way"
 * https://redux.js.org/faq/reducers#how-do-i-share-state-between-two-reducers-do-i-have-to-use-combinereducers
 * **/
export const getProductsWithAttributes = createAsyncThunk<{attributesOrder: number[], products: IProductWithAttributes[]}, {productGroupId: string, languageId: number}, {rejectValue: IRejectQueryThunk}>(
'new-product/get-products-with-attributes',
async (args, thunkAPI) => {
    try {
        const response = await Api.product.getProductsWithAttributes(args);
        if(!response.success) {
            if(response.status === 401)
                thunkAPI.dispatch(actions.clearCredentials())
            return thunkAPI.rejectWithValue({exception: response.exception?.text ?? null, statusCode: response.status})
        }

        const attributesOrder = (thunkAPI.getState() as AppState).local.newProductState.common.productGroup.attributesColumnOrder!
        return {
            attributesOrder: attributesOrder,
            products: response.data!
        }
    }
    catch (e) {
        console.log(e)
        return thunkAPI.rejectWithValue({exception: "net::ERR_CONNECTION_REFUSED", statusCode: 0})
    }
})

export const addProductToProductGroupThunk = createApiThunk({
    typePrefix: 'new-product/add-product-to-grop',
    apiCall: Api.product.addProductToGroup
})

export const replaceProductInGroupThunk = createApiThunk({
    typePrefix: 'new-product/replace-products-in-group',
    apiCall: Api.product.replaceProductsInGroup
})

export const removeProductFromGroupThunk = createApiThunk({
    typePrefix: 'new-product/remove-product-from-group',
    apiCall: Api.product.removeProductFromGroup
})

export const getProductsWithoutGroupThunk = createApiThunk({
    typePrefix: 'new-product/get-products-without-group',
    apiCall: Api.product.getProductsIdentityWithoutGroup
})

export const swapProductSortThunk = createApiThunk({
    typePrefix: 'new-product/swap-product-sorting',
    apiCall: Api.product.swapProductSort
})

export const addAttributeThunk = createApiThunk({
    typePrefix: 'new-product/add-attribute-to-product',
    apiCall: Api.productGroups.addAttribute
})

export const removeAttributeThunk = createApiThunk({
    typePrefix: 'new-product/remove-attribute-from-product',
    apiCall: Api.productGroups.removeAttribute
})

export const changeAttributeOrderThunk = createApiThunk({
    typePrefix: 'new-product/change-attribute-order',
    apiCall: Api.productGroups.changeAttributeOrder
})

export const changeAttributesValuesThunk = createApiThunk({
    typePrefix: 'new-product/change-attribute-values',
    apiCall: Api.product.changeAttributesValues
})