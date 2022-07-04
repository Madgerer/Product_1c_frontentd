import {ILoadingModel} from "../../../../redux/types";
import {ICategory, IProductGroupIdentity, IProductIdentity} from "../../../../domain/types";

export type IProductGroupIdentityModel = IProductGroupIdentity
    & ILoadingModel
    & { products: IProductIdentity[] | null, checked : boolean }

export type ICategoryIdentityModel = {
    id: number,
    parentId: number,
    name: string,
    children: ICategoryIdentityModel[],
    checked: boolean,
    selected: boolean
}

export function mapCategoryToModel(category: ICategory): ICategoryIdentityModel {
    return {
        id: category.id,
        checked: false,
        name: category.name,
        parentId: category.parentId,
        children: category.children.map(x => mapCategoryToModel(x)),
        selected: false
    }
}