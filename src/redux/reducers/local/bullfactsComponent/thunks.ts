import {createApiThunk} from "../../../createApiThunk";
import Api from "../../../../api";

export const getTranslatesThunk = createApiThunk({
    typePrefix: "bullfacts/get-translates",
    apiCall: Api.translate.getTranslates
})

export const updateTranslateThunk = createApiThunk({
    typePrefix: "bullfacts/update-translates",
    apiCall: Api.translate.updateTranslates
})