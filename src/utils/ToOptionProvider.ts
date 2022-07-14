import {IOptionType} from "../app/common/SimpleSelect";
import {
    IAttribute,
    ICategory,
    ILanguage,
    IPriceGroup,
    IScopeOfApplication,
    ISeries,
    ISign,
    IWebsite
} from "../domain/types";

export default class ToOptionProvider {
    static languageToOption = (language: ILanguage): IOptionType => {return {value: language.id, label: language.name}}

    static websiteToOption = (website: IWebsite): IOptionType => {return {value: website.id, label: website.name}}

    static seriesToOption = (series: ISeries): IOptionType => {return {value: series.id, label: series.name}}

    static signToOption = (sign: ISign): IOptionType => {return  {value: sign.id, label: sign.name}}

    static attributeToOption = (attribute: IAttribute): IOptionType => {return {value: attribute.id, label: attribute.name}}

    static priceGroupToOption = (priceGroup: IPriceGroup): IOptionType => {return {value: priceGroup.id, label: priceGroup.name}}

    static categoryToOption = (category: ICategory): IOptionType => {return {value: category.id, label: category.name}}

    static scopeToOption = (scope: IScopeOfApplication): IOptionType => {return {value: scope.id, label: scope.name}}
}