import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {ILanguage} from "../../redux/reducers/languages/types";
import {IProductIdentity} from "../../redux/reducers/local/productComponent/productList/types";

export default class ProductApi extends BaseApi {
    async getProductsIdentity(priceGroupId: number, languageId: number): Promise<IApplicationResponse<IProductIdentity[]>> {
        let data = {priceGroupId: priceGroupId, languageId: languageId};
        return await this.sendQuery<IProductIdentity[]>('/api/product/identity/no-group', data, actionTypes.get, true);
    }
}