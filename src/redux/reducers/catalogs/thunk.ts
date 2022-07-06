import Api from "../../../api";
import {createNoArgsApiThunk} from "../../createApiThunk";

export const getCatalogsThunk = createNoArgsApiThunk({
    typePrefix: "get/catalogs",
    apiCall: Api.catalogs.getCatalogs
})