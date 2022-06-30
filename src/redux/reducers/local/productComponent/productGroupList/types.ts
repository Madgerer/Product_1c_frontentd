import {IOptionType} from "../../../../../app/common/SimpleSelect";

export interface IProductGroupIdentity {
    id: string,
    name: string,
    checkedByHuman: boolean,
    imageChecked: boolean
}

export interface ICardType extends IOptionType {
}