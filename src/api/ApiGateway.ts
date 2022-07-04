import AuthApi from "./auth/AuthApi";
import TranslateApi from "./translate/TranslateApi";
import PriceGroupApi from "./priceGroups/PriceGroupApi";
import ProductApi from "./product/ProductApi";
import CatalogsApi from "./catalogs/CatalogApi";
import SellmarkApi from "./sellmarkApi/SellmarkApi";
import ProductGroupApi from "./productGroup/ProductGroupApi";
import CategoryApi from "./categoryApi/CategoryApi";

interface IApplicationApi {
    auth: AuthApi,
    translate: TranslateApi,
    priceGroup: PriceGroupApi,
    product: ProductApi,
    catalogs: CatalogsApi,
    sellmarks: SellmarkApi,
    productGroups: ProductGroupApi,
    category: CategoryApi
}

export class ApiGateway implements IApplicationApi {
    auth: AuthApi;
    translate: TranslateApi;
    priceGroup: PriceGroupApi;
    product: ProductApi
    catalogs: CatalogsApi;
    sellmarks: SellmarkApi;
    productGroups: ProductGroupApi;
    category: CategoryApi;

    constructor() {
        this.auth = new AuthApi();
        this.translate = new TranslateApi();
        this.priceGroup = new PriceGroupApi();
        this.product = new ProductApi()
        this.catalogs = new CatalogsApi();
        this.sellmarks = new SellmarkApi();
        this.productGroups = new ProductGroupApi()
        this.category = new CategoryApi();
    }
}