import Api from "../../../api";
import {createNoArgsApiThunk} from "../../createApiThunk";

export const getPriceGroupsThunk = createNoArgsApiThunk({
    typePrefix: "get/priceGroups",
    apiCall: Api.priceGroup.getPriceGroups
})