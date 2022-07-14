import {IAttribute, IProductIdentity, IProductWithAttributes} from "../../../../../domain/types";
import {ISelectable} from "../../../../types";

export type ProductWithAttributes = IProductWithAttributes & ISelectable

export type TablePartTabState = {
    description: string,
    descriptionWeb: string,

    productsWithAttr: ProductWithAttributes[],
    selectedProductWithAttr: ProductWithAttributes[]
    selectedAttributeColumn: number
    accumulatedChanges: IProductWithAttributes

    attributes: IAttribute[]
    selectedAttribute: IAttribute

    product: IProductIdentity[],
    selectedProduct: IProductIdentity,
}