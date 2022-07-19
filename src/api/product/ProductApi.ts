import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {IProductBase, IProductIdentity, IProductWithAttributes} from "../../domain/types";

export default class ProductApi extends BaseApi {

    getProductsIdentityWithoutGroup = (args: {priceGroupId: number, languageId: number}): Promise<IApplicationResponse<IProductIdentity[]>> =>
         this.sendQuery<IProductIdentity[]>('/api/product/identity/no-group', args, actionTypes.get, true);

    getProductsIdentityByGroup = (data: {productGroupId: string, languageId: number}): Promise<IApplicationResponse<IProductIdentity[]>> =>
        this.sendQuery<IProductIdentity[]>('/api/product/identity/by-group', data, actionTypes.get, true);

    addProductToGroup = async (data: {productGroupId: string, productIds: string[]}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/product/add-product-to-group', data, actionTypes.post, true);

    removeProductFromGroup = async (data: {productGroupId: string, productId: string}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/product/remove-product-from-group', data, actionTypes.delete, true);

    replaceProductsInGroup = async (data: {productGroupId: string, productId: string, newProductId: string}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/product/replace-products-in-group', data, actionTypes.put, true);

    changeAttributesValues = async (data: {productGroupId: string, values: {attributeId: number, value: string, productId: string}[]}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/product/change-attribute-value', data, actionTypes.put, true);

    swapProductSort = async (data: {firstProductId: string, secondProductId: string}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/product/swap-product-sort', data, actionTypes.put, true);

    getProductsWithAttributes = async (data: {productGroupId: string, languageId: number}): Promise<IApplicationResponse<IProductWithAttributes[]>> =>
        this.sendQuery<IProductWithAttributes[]>('/api/product/products-with-attr/by-groups', data, actionTypes.get, true);

    getAllRecommendations = async (data: {priceGroupId: string, languageId: number}): Promise<IApplicationResponse<IProductIdentity[]>> =>
        this.sendQuery<IProductIdentity[]>('/api/product/recommendations/all', data, actionTypes.get, true);

    getGroupRecommendations = async (data: {productGroupId: string, languageId: number}): Promise<IApplicationResponse<IProductBase[]>> =>
        this.sendQuery<IProductBase[]>('/api/product/recommendations/group', data, actionTypes.get, true);

    addRecommendation = async (data: {productGroupId: string, productId: string}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/product/add-recommendation', data, actionTypes.post, true);

    removeRecommendation = async (data: {productGroupId: string, productId: string}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/product/remove-recommendation', data, actionTypes.delete, true);

    swapRecommendationSort = async (data: {productGroupId: string, firstProductId: string, secondProductId: string}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/product/recommendation/swap-sort', data, actionTypes.put, true);
}