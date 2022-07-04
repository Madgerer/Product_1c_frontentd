import {ILoadingModel} from "../../../../redux/types";
import {IProductGroupIdentity, IProductIdentity} from "../../../../domain/types";

export type IProductGroupIdentityModel = IProductGroupIdentity
    & ILoadingModel
    & { products: IProductIdentity[] | null, checked : boolean }