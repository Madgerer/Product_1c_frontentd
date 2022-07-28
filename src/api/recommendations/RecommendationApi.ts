import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {IGroupRecommendation, IProductIdentity} from "../../domain/types";

export default class RecommendationApi extends BaseApi {
    getAllRecommendations = async (data: {productGroupId: string, priceGroupId: number, search: string, languageId: number}): Promise<IApplicationResponse<IProductIdentity[]>> =>
        this.sendQuery<IProductIdentity[]>('/api/recommendations/all', data, actionTypes.get, true);

    getGroupRecommendations = async (data: {productGroupId: string, languageId: number}): Promise<IApplicationResponse<IGroupRecommendation>> =>
        this.sendQuery<IGroupRecommendation>('/api/recommendations/group', data, actionTypes.get, true);

    addRecommendations = async (data: {productGroupId: string, productsIds: string[]}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/recommendations/add-recommendation', data, actionTypes.post, true);

    removeRecommendation = async (data: {productGroupId: string, productId: string}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/recommendations/remove-recommendation', data, actionTypes.delete, true);

    swapRecommendationSort = async (data: {productGroupId: string, firstProductId: string, secondProductId: string}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/recommendations/swap-sort', data, actionTypes.put, true);
}