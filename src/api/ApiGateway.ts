import AuthApi from "./auth/AuthApi";
import TranslateApi from "./translate/TranslateApi";
import PriceGroupApi from "./priceGroups/PriceGroupApi";

interface IApplicationApi {
    auth: AuthApi,
    translate: TranslateApi,
    priceGroup: PriceGroupApi
}

export class ApiGateway implements IApplicationApi {
    auth: AuthApi;
    translate: TranslateApi;
    priceGroup: PriceGroupApi;

    constructor() {
        this.auth = new AuthApi();
        this.translate = new TranslateApi();
        this.priceGroup = new PriceGroupApi();
    }
}