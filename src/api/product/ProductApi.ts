import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {IProductIdentity} from "../../domain/types";

export default class ProductApi extends BaseApi {
    async getProductsIdentityWithoutGroup(priceGroupId: number, languageId: number): Promise<IApplicationResponse<IProductIdentity[]>> {
        const data = {
            priceGroupId: priceGroupId,
            languageId: languageId
        };
        return await this.sendQuery<IProductIdentity[]>('/api/product/identity/no-group', data, actionTypes.get, true);
    }

    async getProductsIdentityByGroup(productGroupId: string, languageId: number): Promise<IApplicationResponse<IProductIdentity[]>> {
        const data = {
            productGroupId: productGroupId,
            languageId: languageId
        };
        return await this.sendQuery<IProductIdentity[]>('/api/product/identity/by-group', data, actionTypes.get, true);
    }
}