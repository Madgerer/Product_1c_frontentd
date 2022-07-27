import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {IWebsite} from "../../domain/types";

export default class WebsitesApi extends BaseApi {

    getWebsitesIdentity = (): Promise<IApplicationResponse<IWebsite[]>> =>
        this.sendQuery<IWebsite[]>('/api/websites/identity', null, actionTypes.get, true);

    isOnSite = async (data: {productGroupId: string, websiteId: number}): Promise<IApplicationResponse<boolean>> =>
        this.sendQuery<boolean>('/api/websites/is-on-site', data, actionTypes.get, true);

    addGroupToSite = async (data: {productGroupId: string, websiteId: number}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/websites/add-group', data, actionTypes.get, true);

    removeFromSite = async (data: {productGroupId: string, websiteId: number}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/websites/add-group', data, actionTypes.get, true);
}