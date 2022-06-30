import AuthApi from "./auth/AuthApi";
import TranslateApi from "./translate/TranslateApi";
import PriceGroupApi from "./priceGroups/PriceGroupApi";
import ProductApi from "./product/ProductApi";

interface IApplicationApi {
    auth: AuthApi,
    translate: TranslateApi,
    priceGroup: PriceGroupApi
    product: ProductApi
}

export class ApiGateway implements IApplicationApi {
    auth: AuthApi;
    translate: TranslateApi;
    priceGroup: PriceGroupApi;
    product: ProductApi

    constructor() {
        this.auth = new AuthApi();
        this.translate = new TranslateApi();
        this.priceGroup = new PriceGroupApi();
        this.product = new ProductApi()
    }
}