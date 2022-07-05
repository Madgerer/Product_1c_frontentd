import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {ISellmark} from "../../domain/types";

export default class SellmarkApi extends BaseApi {

    getSellmartks1 = async (): Promise<IApplicationResponse<ISellmark[]>> => this.sendQuery<ISellmark[]>('/api/sellmarks', null, actionTypes.get, true);

    async getSellmarks(): Promise<IApplicationResponse<ISellmark[]>> {
        const response = this.sendQuery<ISellmark[]>('/api/sellmarks', null, actionTypes.get, true);
        return response;
    }
}