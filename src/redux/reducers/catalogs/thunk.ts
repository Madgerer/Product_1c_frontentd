import Api from "../../../api";
import {createNoArgsApiThunk} from "../../createApiThunk";

export const getCatalogs = createNoArgsApiThunk({
    typePrefix: "get/catalogs",
    apiCall: Api.catalogs.getCatalogs
})