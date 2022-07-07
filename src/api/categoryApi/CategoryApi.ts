import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {CatalogGroup, ICategory} from "../../domain/types";
import HttpActions from "../HttpActions";


export default class CategoryApi extends BaseApi {

    getCategoriesByCatalogGroups = (data: {catalogGroup: CatalogGroup, languageId: number}): Promise<IApplicationResponse<ICategory[]>> =>
         this.sendQuery<ICategory[]>('/api/category', data, actionTypes.get, true);

    updateCategoryName = (data: {id: number, name: string, catalogGroup: CatalogGroup, languageId: number}): Promise<IApplicationResponse<void>> =>
        this.sendQuery('/api/category/change-name', data, actionTypes.put, true);

    createCategory = (data: {parentId: number | null, name: string, catalogGroup: CatalogGroup, languageId: number}) : Promise<IApplicationResponse<number>> =>
        this.sendQuery('/api/category', data, actionTypes.post, true);

    deleteCategory = (data: {id: number, catalogGroup: number}): Promise<IApplicationResponse<void>> =>
        this.sendQuery('/api/category', data, actionTypes.delete, true);
}