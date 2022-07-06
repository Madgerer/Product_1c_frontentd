import Api from "../../../api";
import {createNoArgsApiThunk} from "../../createApiThunk";

export const getLanguagesThunk = createNoArgsApiThunk({
    typePrefix: "get/languages",
    apiCall: Api.translate.getLanguages
})