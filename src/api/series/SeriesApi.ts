import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {ISeries} from "../../domain/types";

export default class SeriesApi extends BaseApi {

    getSeries = async (): Promise<IApplicationResponse<ISeries[]>> =>
        this.sendQuery<ISeries[]>('/api/series', null, actionTypes.get, true);
}