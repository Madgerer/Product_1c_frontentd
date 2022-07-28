import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {IGroupRecommendation, IProductIdentity} from "../../domain/types";

export default class RecommendationApi extends BaseApi {
    getAllRecommendations = async (data: {priceGroupId: number, search: string, languageId: number}): Promise<IApplicationResponse<IProductIdentity[]>> =>
        this.sendQuery<IProductIdentity[]>('/api/product/recommendations/all', data, actionTypes.get, true);

    getGroupRecommendations = async (data: {productGroupId: string, languageId: number}): Promise<IApplicationResponse<IGroupRecommendation>> =>
        this.sendQuery<IGroupRecommendation>('/api/product/recommendations/group', data, actionTypes.get, true);

    addRecommendation = async (data: {productGroupId: string, productsIds: string[]}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/product/add-recommendation', data, actionTypes.post, true);

    removeRecommendation = async (data: {productGroupId: string, productId: string}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/product/remove-recommendation', data, actionTypes.delete, true);

    swapRecommendationSort = async (data: {productGroupId: string, firstProductId: string, secondProductId: string}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/product/recommendation/swap-sort', data, actionTypes.put, true);
}