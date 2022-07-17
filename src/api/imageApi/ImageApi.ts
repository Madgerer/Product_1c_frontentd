import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {IImage, IImageType} from "../../domain/types";

export default class ImageApi extends BaseApi {

    getImageTypes = (): Promise<IApplicationResponse<IImageType[]>> =>
        this.sendQuery<IImageType[]>('/api/images/types', null, actionTypes.get, true);

    getImages = (args: {productGroupId: string}): Promise<IApplicationResponse<IImage[]>> =>
        this.sendQuery<IImage[]>('/api/images', args, actionTypes.get, true);

    uploadImage = (args: {productGroupId: string, imageType: number, image: File}): Promise<IApplicationResponse<string>> =>
        this.sendQuery<string>('/api/images', args, actionTypes.postFile, true);

    addVideo = (args: {productGroupId: string, videoUrl: string}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/images/video', args, actionTypes.post, true);

    removeImage = (args: {productGroupId: string, imageType: number}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/images', args, actionTypes.delete, true);

    updateImage = (args: {productGroupId: string, imageType: number, image: File}): Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/images', args, actionTypes.putFile, true);
}