import {IOptionType} from "../app/common/SimpleSelect";

export interface ICatalog {
    id: number,
    name: string,
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
    isImageChecked: boolean
}

export interface ICardValidationType extends IOptionType {

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