import AuthApi from "./auth/AuthApi";
import TranslateApi from "./translate/TranslateApi";
import PriceGroupApi from "./priceGroups/PriceGroupApi";
import ProductApi from "./product/ProductApi";
import CatalogsApi from "./catalogs/CatalogApi";
import SellmarkApi from "./sellmarkApi/SellmarkApi";
import ProductGroupApi from "./productGroup/ProductGroupApi";
import CategoryApi from "./categoryApi/CategoryApi";
import WebsitesApi from "./websites/WebsitesApi";
import AttributeApi from "./attribute/AttributeApi";
import SeriesApi from "./series/SeriesApi";
import SignApi from "./sign/SignApi";
import ScopeOfApplicationApi from "./scopeOfApplicationApi/ScopeOfApplicationApi";
import ImageApi from "./imageApi/ImageApi";

interface IApplicationApi {
    auth: AuthApi,
    translate: TranslateApi,
    priceGroup: PriceGroupApi,
    product: ProductApi,
    catalogs: CatalogsApi,
    sellmarks: SellmarkApi,
    productGroups: ProductGroupApi,
    category: CategoryApi,
    websites: WebsitesApi,
    attributes: AttributeApi,
    series: SeriesApi,
    sign: SignApi,
    scopes: ScopeOfApplicationApi,
    images: ImageApi
}

/**
 Api should be ARROW FUNCTIONS because of context visibility and should accept only objects because of thunk handling
 for example:
 login = async (authData: {username: string, password: string}): Promise<IApplicationResponse<string>> =>
    this.sendQuery<string>('/api/auth/', authData, actionTypes.get, false);
 NOT
 async login(username: string, password: string): Promise<IApplicationResponse<string>> {
        const response = this.sendQuery<string>('/api/auth/', {
            username: username,
            password: password
        }, actionTypes.get, false);
        return response;
    }
 **/
export class ApiGateway implements IApplicationApi {

    static Api = new ApiGateway()

    auth: AuthApi;
    translate: TranslateApi;
    priceGroup: PriceGroupApi;
    product: ProductApi
    catalogs: CatalogsApi;
    sellmarks: SellmarkApi;
    productGroups: ProductGroupApi;
    category: CategoryApi;
    websites: WebsitesApi;
    attributes: AttributeApi;
    series: SeriesApi;
    sign: SignApi;
    scopes: ScopeOfApplicationApi;
    images: ImageApi

    constructor() {
        this.auth = new AuthApi();
        this.translate = new TranslateApi();
        this.priceGroup = new PriceGroupApi();
        this.product = new ProductApi()
        this.catalogs = new CatalogsApi();
        this.sellmarks = new SellmarkApi();
        this.productGroups = new ProductGroupApi()
        this.category = new CategoryApi();
        this.websites = new WebsitesApi();
        this.attributes = new AttributeApi();
        this.series = new SeriesApi();
        this.sign = new SignApi();
        this.scopes = new ScopeOfApplicationApi()
        this.images = new ImageApi()
    }
}