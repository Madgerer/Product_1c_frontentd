import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {ISeries} from "../../domain/types";

export default class SeriesApi extends BaseApi {

    getSigns = async (): Promise<IApplicationResponse<ISeries[]>> =>
        this.sendQuery<ISeries[]>('/api/sign', null, actionTypes.get, true);
}