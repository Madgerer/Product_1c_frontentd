import {IOptionType} from "../app/common/SimpleSelect";

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

export interface IProductGroupWithCategoryPath {
    productGroupId: string,
    categoryPath: number[]
}

export enum DistributionType {
    NotDistributed = 1,
    Distributed = 2
}

export enum CatalogGroup {
    Web = 0,
    Printed = 1
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

export interface IProductGroupSort {
    id: string,
    sort: number
}

export interface ICardDistributionType extends IOptionType {

}

export interface IProductIdentity {
    id: string,
    name: string
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