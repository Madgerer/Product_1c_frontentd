import {createNoArgsApiThunk} from "../../createApiThunk";
import {ApiGateway} from "../../../api/ApiGateway";

export const getSellmarksThunk = createNoArgsApiThunk({
    typePrefix: 'upload/sellmarks',
    apiCall: ApiGateway.Api.sellmarks.getSellmartks1
});