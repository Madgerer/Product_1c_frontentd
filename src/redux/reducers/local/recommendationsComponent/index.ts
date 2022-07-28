import {IPictogram, IProductIdentity, IRecommendation} from "../../../../domain/types";
import {ISelectable} from "../../../types";
import {createSlice} from "@reduxjs/toolkit";

export type Recommendation = IProductIdentity & ISelectable

export type RecommendationsState = {
    pictograms: IPictogram[],
    selectedPictogram: IPictogram | null,

    searchString: string,

    recommendationIds: [],
    recommendations: {}
}

const INITIAL_PICTOGRAMS: IPictogram[] = [{id: -1, name: 'loading', imageUrl: '', sort: -1, isSet: false}]

const INITIAL_STATE: RecommendationsState = {
    pictograms: INITIAL_PICTOGRAMS,
    selectedPictogram: INITIAL_PICTOGRAMS[0],
    searchString: "",
    recommendationIds: [],
    recommendations: {}
}

const slice = createSlice({
    name: 'recom-page',
    initialState: INITIAL_STATE,
    reducers: {

    }
})