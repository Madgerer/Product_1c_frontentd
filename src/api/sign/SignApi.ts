import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {ISign} from "../../domain/types";

export default class SignApi extends BaseApi {

    getSigns = async (): Promise<IApplicationResponse<ISign[]>> =>
        this.sendQuery<ISign[]>('/api/sign', null, actionTypes.get, true);
}