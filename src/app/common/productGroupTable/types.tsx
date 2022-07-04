import {IProductGroupIdentity, IProductIdentity} from "../../../domain/types";
import {ILoadingModel} from "../../../redux/types";

export type IProductGroupIdentityModel = IProductGroupIdentity
    & ILoadingModel
    & { products: IProductIdentity[] | null, checked : boolean }