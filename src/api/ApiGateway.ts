import AuthApi from "./auth/AuthApi";
import TranslateApi from "./translate/TranslateApi";
import PriceGroupApi from "./priceGroups/PriceGroupApi";
import ProductApi from "./product/ProductApi";
import CatalogsApi from "./catalogs/CatalogApi";

interface IApplicationApi {
    auth: AuthApi,
    translate: TranslateApi,
    priceGroup: PriceGroupApi,
    product: ProductApi,
    catalogs: CatalogsApi
}

export class ApiGateway implements IApplicationApi {
    auth: AuthApi;
    translate: TranslateApi;
    priceGroup: PriceGroupApi;
    product: ProductApi
    catalogs: CatalogsApi;

    constructor() {
        this.auth = new AuthApi();
        this.translate = new TranslateApi();
        this.priceGroup = new PriceGroupApi();
        this.product = new ProductApi()
        this.catalogs = new CatalogsApi();
    }

}