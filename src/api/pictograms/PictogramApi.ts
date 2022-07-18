import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {IPictogram} from "../../domain/types";

export default class PictogramApi extends BaseApi {

    getAllPictograms = (args: {languageId: number}): Promise<IApplicationResponse<IPictogram[]>> =>
        this.sendQuery<IPictogram[]>('/api/pictograms/all', args, actionTypes.get, true);

    getProductGroupPictograms = (args: {productGroupId: string, languageId: number}): Promise<IApplicationResponse<IPictogram[]>> =>
        this.sendQuery<IPictogram[]>('/api/pictograms', args, actionTypes.get, true);

    addPictogramToGroup = (args: {productGroupId: string, pictogramId: number}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/pictograms', args, actionTypes.post, true);

    removePictogramToGroup = (args: {productGroupId: string, pictogramId: number}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/pictograms', args, actionTypes.delete, true);

    changeGroupPictogram = (args: {productGroupId: string, pictogramId: number, newPictogramId: number}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/pictograms', args, actionTypes.put, true);
}