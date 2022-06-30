import {IOptionType} from "../../../../../app/Common/SimpleSelect";

export interface IProductGroupIdentity {
    id: string,
    name: string,
    checkedByHuman: boolean,
    imageChecked: boolean
}

export interface ICardType extends IOptionType {
}