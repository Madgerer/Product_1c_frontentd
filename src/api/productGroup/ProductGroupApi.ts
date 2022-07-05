import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {ICardDistributionType, IProductGroupBasic, IProductGroupIdentity} from "../../domain/types";

export default class ProductGroupApi extends BaseApi {

    getProductsGroupsIdentity = async (data: {priceGroupId: number, languageId: number, searchString: string, distributionType: ICardDistributionType}): Promise<IApplicationResponse<IProductGroupIdentity[]>> =>
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
                                      categoryId: number}): Promise<IApplicationResponse<IProductGroupBasic[]>> =>
        this.sendQuery<IProductGroupBasic[]>('/api/product-group/identity/by-category', data, actionTypes.get, true);
}