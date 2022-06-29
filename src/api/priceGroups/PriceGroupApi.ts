import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {IPriceGroup} from "../../redux/reducers/priceGroups/types";

export default class PriceGroupApi extends BaseApi {

    async getPriceGroups(username: string, password: string): Promise<IApplicationResponse<IPriceGroup[]>> {
        const response = this.sendQuery<IPriceGroup[]>('/api/price-group', {
            username: username,
            password: password
        }, actionTypes.get, false);
        return response;
    }
}