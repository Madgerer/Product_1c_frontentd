import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {ISellmark} from "../../redux/reducers/sellmarks/types";

export default class SellmarkApi extends BaseApi {

    async getSellmarks(): Promise<IApplicationResponse<ISellmark[]>> {
        const response = this.sendQuery<ISellmark[]>('/api/sellmarks', null, actionTypes.get, true);
        return response;
    }
}