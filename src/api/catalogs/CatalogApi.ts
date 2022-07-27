import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {ICatalog, IProductGroupCatalog} from "../../domain/types";

export default class CatalogsApi extends BaseApi {

    getCatalogs = (): Promise<IApplicationResponse<ICatalog[]>> => this.sendQuery<ICatalog[]>('/api/catalogs', null, actionTypes.get, true);

    getProductGroupCatalogs = async (data: {productGroupId: string}): Promise<IApplicationResponse<IProductGroupCatalog[]>> =>
        this.sendQuery<IProductGroupCatalog[]>('/api/product-group/group-catalogs', data, actionTypes.get, true);

    changeShowStatus = async (data: {productGroupId: string, catalogId: number, showStatus: boolean}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/product-group/change-show-status', data, actionTypes.put, true)
}