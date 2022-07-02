import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {ICatalog} from "../../domain/types";

export default class CatalogsApi extends BaseApi {

    async getCatalogs(): Promise<IApplicationResponse<ICatalog[]>> {
        return this.sendQuery<ICatalog[]>('/api/catalogs', null, actionTypes.get, true);
    }
}