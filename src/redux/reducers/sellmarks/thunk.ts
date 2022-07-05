import {createNoArgsApiThunk} from "../../createApiThunk";
import {ApiGateway} from "../../../api/ApiGateway";

export const getSellmarksThunk = createNoArgsApiThunk({
    typePrefix: 'get/sellmarks',
    apiCall: ApiGateway.Api.sellmarks.getSellmarks
});