import {IOptionType} from "../app/common/basic/selectors/SimpleSelect";

export interface ICatalog {
    id: number,
    name: string,
    isPrinted: boolean
}

export interface ICategory {
    id: number,
    parentId: number,
    name: string,
    children: ICategory[]
}

export interface IProductGroup {
    id: string,
    name: string,
    description: string,
    descriptionWeb: string,
    attributesColumnOrder: number[] | null,
    seriesId: number | null,
    signId: number | null,
    sellmarkId: number | null,
    priceGroupId: number | null,
    mainAttributeId: number | null,
    isDescriptionChecked: boolean,
    isToolset: boolean,
    isImageChecked: boolean,
    siteId: number,
    wasCreate: boolean
}

export interface ISeries {
    id: number,
    name: string,
    titleEng: string,
    imageUrl: string
}

export interface ISign {
    id: number,
    name: string,
    imageUrl: string
}

export interface IAttribute {
    id: number,
    name: string
}

export interface IScopeOfApplication {
    id: number,
    name: string,
    sort: number | null
}

export interface IProductGroupScope {
    productGroupId: string,
    scopeId: number
}

export interface IProductGroupWithCategoryPath {
    productGroupId: string,
    categoryPath: number[]
    mainCategory: boolean | null
}

export enum DistributionType {
    NotDistributed = 1,
    Distributed = 2
}

export enum CatalogGroup {
    Web = 0,
    Printed = 1
}

export interface IGroupRecommendation {
    productGroupId: string,
    recommendations: IRecommendation[]
}

export interface IRecommendation {
    productId: string,
    name: string,
    sort: number
}

export interface ICatalogGroup {
    id: number,
    name: string,
}

export interface ILanguage {
    id: number;
    name: string;
}

export interface IProductGroupIdentity {
    id: string,
    name: string,
    isDescriptionChecked: boolean,
    isImageChecked: boolean,
    sort: number | null
}

export interface IProductGroupCatalog {
    productGroupId: string,
    catalogId: number,
    catalogName: string,
    catalogCategoryId: number | null,
    catalogParentCategoryId: number | null,
    webCategoryId: number | null,
    sort: number | null,
    showStatus: boolean
}

export interface IImageType {
    id: number,
    name: string
}

export interface IPictogram {
    id: number,
    name: string,
    imageUrl: string,
    sort: number,
    isSet: boolean
}

export interface IImage {
    typeId: number,
    imageUrl: string
}

export interface IProductGroupSort {
    id: string,
    sort: number
}

export interface ITranslate {
    id: number,
    russian: string,
    translate: string,
    source: number,
    sourceId: string
}

export interface ICardDistributionType extends IOptionType {

}

export interface IProductIdentity {
    id: string,
    name: string
    priceGroupId: number
}

export interface IProductBase extends IProductIdentity{
    sort: number | null
}

export interface IProductWithAttributes extends IProductIdentity{
    sort: number | null
    attributeValues: IAttributeValue[]
}

export interface IAttributeValue {
    id: number
    value: string
}

export interface IPriceGroup {
    id: number,
    name: string
}

export interface ISellmark {
    id: number,
    name: string,
    imageUrl?: string | null
}

export interface IWebsite {
    id: number,
    name: string
}