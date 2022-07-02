import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {ICardValidationType, IProductGroupIdentity} from "../../domain/types";

export default class ProductGroupApi extends BaseApi {
    async getProductsGroupsIdentity(priceGroupId: number, languageId: number, cardValidationType: ICardValidationType): Promise<IApplicationResponse<IProductGroupIdentity[]>> {
        let data = {
            priceGroupId: priceGroupId,
            languageId: languageId,
            pgValidationType: cardValidationType
        };
        return await this.sendQuery<IProductGroupIdentity[]>('/api/product-group/identity', data, actionTypes.get, true);
    }
}