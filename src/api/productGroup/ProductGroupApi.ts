import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {ICardValidationType, IProductGroupIdentity} from "../../domain/types";
import {DistributionTypeState} from "../../redux/reducers/distributionsTypes";

export default class ProductGroupApi extends BaseApi {
    async getProductsGroupsIdentity(priceGroupId: number, languageId: number, searchString: string, cardValidationType: ICardValidationType)
            : Promise<IApplicationResponse<IProductGroupIdentity[]>> {
        let data = {
            priceGroupId: priceGroupId,
            languageId: languageId,
            pgValidationType: cardValidationType.value,
            searchString: searchString
        };
        return await this.sendQuery<IProductGroupIdentity[]>('/api/product-group/identity', data, actionTypes.get, true);
    }

    async getProductsGroupsFromCatalog(priceGroupId: number,
                                       languageId: number,
                                       searchString: string,
                                       distributionType: number,
                                       catalogId: number,
                                       sellmarkId: number)
        : Promise<IApplicationResponse<IProductGroupIdentity[]>> {
        const data = {
            priceGroupId: priceGroupId,
            languageId: languageId,
            searchString: searchString,
            distributionType: distributionType,
            catalogId: catalogId,
            sellmarkId: sellmarkId
        };
        return await this.sendQuery<IProductGroupIdentity[]>('/api/product-group/identity/from-catalog', data, actionTypes.get, true);
    }
}