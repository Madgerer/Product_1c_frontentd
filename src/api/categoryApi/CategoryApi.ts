import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {CatalogGroup, ICategory} from "../../domain/types";


export default class CategoryApi extends BaseApi {

    getCategoriesByCatalogGroups = (data: {catalogGroup: CatalogGroup, languageId: number}): Promise<IApplicationResponse<ICategory[]>> =>
         this.sendQuery<ICategory[]>('/api/category', data, actionTypes.get, true);
}