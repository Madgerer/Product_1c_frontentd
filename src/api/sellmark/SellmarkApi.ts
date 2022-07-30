import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {ISellmark} from "../../domain/types";

export default class SellmarkApi extends BaseApi {

    getSellmarks = async (): Promise<IApplicationResponse<ISellmark[]>> =>
        this.sendQuery<ISellmark[]>('/api/sellmarks', null, actionTypes.get, true);
}