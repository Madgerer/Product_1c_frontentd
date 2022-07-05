import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {IProductIdentity} from "../../domain/types";

export default class ProductApi extends BaseApi {

     getProductsIdentityWithoutGroup = (args: {priceGroupId: number, languageId: number}): Promise<IApplicationResponse<IProductIdentity[]>> =>
         this.sendQuery<IProductIdentity[]>('/api/product/identity/no-group', args, actionTypes.get, true);

    getProductsIdentityByGroup = (data: {productGroupId: string, languageId: number}): Promise<IApplicationResponse<IProductIdentity[]>> =>
        this.sendQuery<IProductIdentity[]>('/api/product/identity/by-group', data, actionTypes.get, true);
}