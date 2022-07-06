import {createNoArgsApiThunk} from "../../createApiThunk";
import {ApiGateway} from "../../../api/ApiGateway";

export const getWebsitesThunk = createNoArgsApiThunk({
    typePrefix: 'get/websites',
    apiCall: ApiGateway.Api.websites.getWebsitesIdentity
});