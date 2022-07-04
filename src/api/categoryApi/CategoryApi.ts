import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {CatalogGroup, ICategory} from "../../domain/types";


export default class CategoryApi extends BaseApi {

    async getCategoriesByCatalogGroups(catalogGroup: CatalogGroup, languageId: number): Promise<IApplicationResponse<ICategory[]>> {
        const data = {
            catalogGroup: catalogGroup,
            languageId: languageId
        }
        return this.sendQuery<ICategory[]>('/api/category', data, actionTypes.get, true);
    }
}