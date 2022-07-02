import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {IPriceGroup} from "../../domain/types";

export default class PriceGroupApi extends BaseApi {

    async getPriceGroups(): Promise<IApplicationResponse<IPriceGroup[]>> {
        const response = this.sendQuery<IPriceGroup[]>('/api/price-group', null, actionTypes.get, true);
        return response;
    }
}