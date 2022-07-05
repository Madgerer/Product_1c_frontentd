import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {IProductIdentity} from "../../domain/types";

export default class ProductApi extends BaseApi {
     getProductsIdentityWithoutGroup = async (args: {priceGroup: number, languageId: number}): Promise<IApplicationResponse<IProductIdentity[]>> =>
         await this.sendQuery<IProductIdentity[]>('/api/product/identity/no-group', args, actionTypes.get, true);

    async getProductsIdentityByGroup(productGroupId: string, languageId: number): Promise<IApplicationResponse<IProductIdentity[]>> {
        const data = {
            productGroupId: productGroupId,
            languageId: languageId
        };
        return await this.sendQuery<IProductIdentity[]>('/api/product/identity/by-group', data, actionTypes.get, true);
    }
}