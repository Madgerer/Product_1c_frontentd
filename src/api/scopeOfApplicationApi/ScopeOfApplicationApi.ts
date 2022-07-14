import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {IProductGroupScope, IScopeOfApplication} from "../../domain/types";

export default class ScopeOfApplicationApi extends BaseApi {

    getScopes = async (data: {languageId: number}): Promise<IApplicationResponse<IScopeOfApplication[]>> =>
        this.sendQuery<IScopeOfApplication[]>('/api/application-scope', data, actionTypes.get, true);

    getProductGroupsScopes = async (data: {productGroupId: string}): Promise<IApplicationResponse<IProductGroupScope[]>> =>
        this.sendQuery<IProductGroupScope[]>('/api/application-scope/product-group-scopes', data, actionTypes.get, true);

    addProductGroupsToScope = async (data: {productGroupId: string, scopeId: number}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/application-scope/add-product-group-to-scope', data, actionTypes.post, true);

    removeProductGroupsFromScope = async (data: {productGroupId: string, scopeId: number}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/application-scope/remove-product-group-from-scope', data, actionTypes.delete, true);

    changeProductGroupsScope = async (data: {productGroupId: string, scopeId: number, newScopeId: number}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/application-scope/change-product-group-from-scope', data, actionTypes.put, true);
}