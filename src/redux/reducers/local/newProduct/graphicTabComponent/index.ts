import {
    IImage,
    IImageType,
    IPictogram
} from "../../../../../domain/types";


export type GraphicTabState = {
    imageTypes: IImageType[],
    selectedImageType: IImageType | null,

    groupImages: IImageType[],
    selectedGroupImage: IImage | null

    pictograms: IPictogram[],
    selectedPictogram: IPictogram | null

    groupPictograms: IPictogram[],
    selectedGroupPictogram: IPictogram | null
}