import {IProductGroup} from "../../../../domain/types";
import {createSlice} from "@reduxjs/toolkit";

export type NewProductState = {
    productGroup: IProductGroup
}

const INITIAL_STATE: NewProductState = {
    productGroup:  {
        id: "",
        name: "",
        attributesColumnOrder: [],
        description: "",
        descriptionChecked: "",
        descriptionWeb: "",
        isToolset: false,
        isImageChecked: false,
        mainAttributeId: null,
        priceGroupId: null,
        sellmarkId: null,
        seriesId: null,
        signId: null,
        siteId: null
    }
}

const slice = createSlice({
    name: 'new-product',
    initialState: INITIAL_STATE,
    reducers: {},
})