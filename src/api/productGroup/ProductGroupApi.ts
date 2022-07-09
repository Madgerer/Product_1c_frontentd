import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {IProductGroupIdentity, IProductGroupSort} from "../../domain/types";

export default class ProductGroupApi extends BaseApi {

    getProductsGroupsIdentity = async (data: {priceGroupId: number, languageId: number, searchString: string, pgValidationType: number}): Promise<IApplicationResponse<IProductGroupIdentity[]>> =>
         this.sendQuery<IProductGroupIdentity[]>('/api/product-group/identity', data, actionTypes.get, true);

    getProductsGroupsFromCatalog = async (data: {priceGroupId: number,
                                       languageId: number,
                                       searchString: string,
                                       distributionType: number,
                                       catalogGroup: number,
                                       catalogId: number,
                                       sellmarkId: number}): Promise<IApplicationResponse<IProductGroupIdentity[]>> =>
        this.sendQuery<IProductGroupIdentity[]>('/api/product-group/identity/by-catalog', data, actionTypes.get, true);

    getProductsGroupsByCategory = async (data: {languageId: number,
                                      searchString: string,
                                      catalogGroup: number,
                                      validationType: number,
                                      catalogId: number | null,
                                      categoryId: number}): Promise<IApplicationResponse<IProductGroupIdentity[]>> =>
        this.sendQuery<IProductGroupIdentity[]>('/api/product-group/identity/by-category', data, actionTypes.get, true);

    recountProductGroupSort = async (data: {catalogId: number}): Promise<IApplicationResponse<IProductGroupSort[]>> =>
        this.sendQuery<IProductGroupSort[]>('/api/product-group/recount-sort', data, actionTypes.post, true);
}