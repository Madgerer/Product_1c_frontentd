import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {IAttribute, IScopeOfApplication} from "../../domain/types";

export default class ScopeOfApplicationApi extends BaseApi {

    getScopes = async (data: {languageId: number}): Promise<IApplicationResponse<IScopeOfApplication[]>> =>
        this.sendQuery<IScopeOfApplication[]>('/api/scope-of-application', data, actionTypes.get, true);
}