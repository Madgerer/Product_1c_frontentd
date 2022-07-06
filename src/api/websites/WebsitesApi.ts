import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {IWebsite} from "../../domain/types";

export default class WebsitesApi extends BaseApi {

    getWebsitesIdentity = (): Promise<IApplicationResponse<IWebsite[]>> =>
        this.sendQuery<IWebsite[]>('/api/websites/identity', null, actionTypes.get, true);
}