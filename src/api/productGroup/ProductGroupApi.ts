import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {IProductGroup, IProductGroupIdentity, IProductGroupSort} from "../../domain/types";

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

    changeProductGroupSort = async (data: {productGroupId: number, catalogId: number, targetSort: number, currentSort: number}): Promise<IApplicationResponse<IProductGroupSort[]>> =>
        this.sendQuery<IProductGroupSort[]>('/api/product-group/change-sort', data, actionTypes.put, true);

    getOrReserve = async (data: {productGroupId: string | null, languageId: number}): Promise<IApplicationResponse<IProductGroup>> =>
        this.sendQuery<IProductGroup>('/api/product-group/get-or-reserve', data, actionTypes.get, true);

    createProductGroup = async (data: {id: string,
                                name: string,
                                seriesId: number | null,
                                signId: number | null,
                                sellmarkId: number | null,
                                priceGroupId: number | null,
                                languageId: number | null }): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/product-group/create', data, actionTypes.post, true);

    deleteProductGroup = async (data: {id: string}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/product-group', data, actionTypes.delete, true);

    discardReserve = async (data: {id: string}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/product-group/discard-reserve', data, actionTypes.delete, true);

    addAttribute = async (data: {productGroupId: string, attributeId: number}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/product-group/add-attribute', data, actionTypes.post, true);

    removeAttribute = async (data: {productGroupId: string, attributeId: number}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/product-group/remove-attribute', data, actionTypes.delete, true);

    changeAttributeOrder = async (data: {productGroupId: string, attributes: number[]}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/product-group/change-attribute-ordering', data, actionTypes.put, true);
}