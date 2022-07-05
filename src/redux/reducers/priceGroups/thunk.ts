import Api from "../../../api";
import {createApiThunk} from "../../createApiThunk";

export const getPriceGroupsThunk = createApiThunk({
    typePrefix: "get/priceGroups",
    apiCall: Api.priceGroup.getPriceGroups
})