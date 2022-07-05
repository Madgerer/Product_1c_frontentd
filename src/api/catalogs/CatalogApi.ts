import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {ICatalog} from "../../domain/types";

export default class CatalogsApi extends BaseApi {

    getCatalogs = (): Promise<IApplicationResponse<ICatalog[]>> => this.sendQuery<ICatalog[]>('/api/catalogs', null, actionTypes.get, true);
}