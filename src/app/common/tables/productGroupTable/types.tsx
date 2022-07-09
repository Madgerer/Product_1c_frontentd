import {ILoadingModel} from "../../../../redux/types";
import {ICategory, IProductGroupIdentity, IProductIdentity} from "../../../../domain/types";

//isLastActive нужна только для того, чтобы подсвечивать последний выбранный элемент на странице /tree
export type IProductGroupIdentityModel = IProductGroupIdentity
    & ILoadingModel
    & { products: IProductIdentity[] | null, checked : boolean, isLastActive }

export type ICategoryIdentityModel = {
    id: number,
    parentId: number,
    name: string,
    children: ICategoryIdentityModel[],
    checked: boolean,
    selected: boolean,
}

export function mapCategoryToModel(category: ICategory): ICategoryIdentityModel {
    return {
        id: category.id,
        checked: false,
        name: category.name,
        parentId: category.parentId,
        children: category.children.map(x => mapCategoryToModel(x)),
        selected: false,
    }
}