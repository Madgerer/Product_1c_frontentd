import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {ICatalog} from "../../redux/reducers/catalogs/types";

export default class CatalogsApi extends BaseApi {

    async getCatalogs(): Promise<IApplicationResponse<ICatalog[]>> {
        const response = this.sendQuery<ICatalog[]>('/api/catalogs', null, actionTypes.get, true);
        return response;
    }
}