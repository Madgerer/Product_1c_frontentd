import {createApiThunk, createNoArgsApiThunk} from "../../../../createApiThunk";
import Api from "../../../../../api";

export const getImageTypesThunk = createNoArgsApiThunk({
    typePrefix: 'new-product/get-image-types',
    apiCall: Api.images.getImageTypes
})

export const getProductImagesThunk = createApiThunk({
    typePrefix: 'new-product/get-product-group-images',
    apiCall: Api.images.getImages
})

export const uploadImageThunk = createApiThunk({
    typePrefix: 'new-product/upload-image',
    apiCall: Api.images.uploadImage
})

export const removeImageThunk = createApiThunk({
    typePrefix: 'new-product/remove-image',
    apiCall: Api.images.removeImage
})

export const updateImageThunk = createApiThunk({
    typePrefix: 'new-product/update-image',
    apiCall: Api.images.updateImage
})

export const getAllPictogramsThunk = createApiThunk({
    typePrefix: 'new-product/get-all-pictograms',
    apiCall: Api.pictograms.getAllPictograms
})

export const getGroupPictogramsThunk = createApiThunk({
    typePrefix: 'new-product/get-group-pictograms',
    apiCall: Api.pictograms.getProductGroupPictograms
})

export const addPictogramToGroupThunk = createApiThunk({
    typePrefix: 'new-product/add-pictogram',
    apiCall: Api.pictograms.addPictogramToGroup
})

export const removePictogramToGroupThunk = createApiThunk({
    typePrefix: 'new-product/remove-pictogram',
    apiCall: Api.pictograms.removePictogramToGroup
})

export const changeGroupPictogramThunk = createApiThunk({
    typePrefix: 'new-product/change-pictogram',
    apiCall: Api.pictograms.changeGroupPictogram
})