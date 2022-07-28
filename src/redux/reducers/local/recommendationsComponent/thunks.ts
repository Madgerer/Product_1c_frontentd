import {createApiThunk} from "../../../createApiThunk";
import Api from "../../../../api";

export const getAllRecommendationThunk = createApiThunk({
    typePrefix: 'new-product/get-all-rec',
    apiCall: Api.recommendations.getAllRecommendations
})

export const getAllPictogramsThunk = createApiThunk({
    typePrefix: 'new-product/get-all-pictograms',
    apiCall: Api.pictograms.getAllPictograms
})
