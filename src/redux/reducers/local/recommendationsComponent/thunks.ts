import {createApiThunk} from "../../../createApiThunk";
import Api from "../../../../api";

export const getAllRecommendationThunk = createApiThunk({
    typePrefix: 'recommendations/get-all-rec',
    apiCall: Api.recommendations.getAllRecommendations
})

export const getAllPictogramsThunk = createApiThunk({
    typePrefix: 'recommendations/get-all-pictograms',
    apiCall: Api.pictograms.getAllPictograms
})

export const addRecommendationsThunk = createApiThunk({
    typePrefix: 'recommendations/add-rec',
    apiCall: Api.recommendations.addRecommendations
})
