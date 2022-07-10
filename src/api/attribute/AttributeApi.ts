import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {IAttribute} from "../../domain/types";

export default class AttributeApi extends BaseApi {

    getAttributes = async (): Promise<IApplicationResponse<IAttribute[]>> =>
        this.sendQuery<IAttribute[]>('/api/attributes', null, actionTypes.get, true);
}