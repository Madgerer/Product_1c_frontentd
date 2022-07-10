import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {CatalogGroup, ICategory, IProductGroupWithCategoryPath} from "../../domain/types";


export default class CategoryApi extends BaseApi {

    getCategoriesByCatalogGroups = (data: {catalogGroup: CatalogGroup, languageId: number}): Promise<IApplicationResponse<ICategory[]>> =>
         this.sendQuery<ICategory[]>('/api/category', data, actionTypes.get, true);

    updateCategoryName = (data: {id: number, name: string, catalogGroup: CatalogGroup, languageId: number}): Promise<IApplicationResponse<void>> =>
        this.sendQuery('/api/category/change-name', data, actionTypes.put, true);

    createCategory = (data: {parentId: number | null, name: string, catalogGroup: CatalogGroup, languageId: number}) : Promise<IApplicationResponse<number>> =>
        this.sendQuery('/api/category', data, actionTypes.post, true);

    deleteCategory = (data: {id: number, catalogGroup: number}): Promise<IApplicationResponse<void>> =>
        this.sendQuery('/api/category', data, actionTypes.delete, true);

    getProductGroupCats = (data: {productGroupId: string, catalogGroup: number, languageId: number}): Promise<IApplicationResponse<IProductGroupWithCategoryPath[]>> =>
        this.sendQuery('/api/category/product-group-cats', data, actionTypes.get, true);

    addProductGroupToCats = (data: {productGroupIds: string[], categoriesIds: number[], catalogGroup: number, catalogId: number | null})
        : Promise<IApplicationResponse<void>> =>
        this.sendQuery('/api/category/add-product-groups-to-cats', data, actionTypes.post, true);

    removeProductGroupsFromCats = (data: {productGroupIds: string[], categoryId: number, catalogGroup: number, catalogId: number | null})
        : Promise<IApplicationResponse<void>> =>
        this.sendQuery('/api/category/remove-product-groups-from-cats', data, actionTypes.delete, true);
}