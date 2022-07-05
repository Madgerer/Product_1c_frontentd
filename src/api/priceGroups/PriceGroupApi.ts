import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {IPriceGroup} from "../../domain/types";

export default class PriceGroupApi extends BaseApi {

    getPriceGroups = (): Promise<IApplicationResponse<IPriceGroup[]>> =>
        this.sendQuery<IPriceGroup[]>('/api/price-group', null, actionTypes.get, true);
}