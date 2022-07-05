import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {IDistributionType, IProductGroupIdentity} from "../../domain/types";

export default class ProductGroupApi extends BaseApi {
    async getProductsGroupsIdentity(priceGroupId: number, languageId: number, searchString: string, distributionType: IDistributionType)
            : Promise<IApplicationResponse<IProductGroupIdentity[]>> {
        let data = {
            priceGroupId: priceGroupId,
            languageId: languageId,
            pgValidationType: distributionType.value,
            searchString: searchString
        };
        return await this.sendQuery<IProductGroupIdentity[]>('/api/product-group/identity', data, actionTypes.get, true);
    }

    async getProductsGroupsFromCatalog(priceGroupId: number,
                                       languageId: number,
                                       searchString: string,
                                       distributionType: number,
                                       catalogGroup: number,
                                       catalogId: number,
                                       sellmarkId: number)
        : Promise<IApplicationResponse<IProductGroupIdentity[]>> {
        const data = {
            priceGroupId: priceGroupId,
            languageId: languageId,
            searchString: searchString,
            distributionType: distributionType,
            catalogGroup: catalogGroup,
            catalogId: catalogId,
            sellmarkId: sellmarkId
        };
        return await this.sendQuery<IProductGroupIdentity[]>('/api/product-group/identity/from-catalog', data, actionTypes.get, true);
    }

    async getProductsGroupsByCategory(languageId: number,
                                      searchString: string,
                                      catalogGroup: number,
                                      catalogId: number,
                                      categoryId: number): Promise<IApplicationResponse<IProductGroupIdentity[]>> {
        const data = {
            languageId: languageId,
            searchString: searchString,
            catalogGroup: catalogGroup,
            catalogId: catalogId,
            categoryId: categoryId
        };
        return await this.sendQuery<IProductGroupIdentity[]>('/api/product-group/identity/by-category', data, actionTypes.get, true);
    }
}