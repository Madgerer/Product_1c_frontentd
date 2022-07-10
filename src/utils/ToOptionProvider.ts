import {IOptionType} from "../app/common/SimpleSelect";
import {IAttribute, ILanguage, IPriceGroup, ISeries, ISign, IWebsite} from "../domain/types";

export default class ToOptionProvider {
    static languageToOption = (language: ILanguage): IOptionType => {return {value: language.id, label: language.name}}

    static websiteToOption = (website: IWebsite): IOptionType => {return {value: website.id, label: website.name}}

    static seriesToOption = (series: ISeries): IOptionType => {return {value: series.id, label: series.name}}

    static signToOption = (sign: ISign): IOptionType => {return  {value: sign.id, label: sign.name}}

    static attributeToOption = (attribute: IAttribute): IOptionType => {return {value: attribute.id, label: attribute.name}}

    static priceGroupToOption = (priceGroup: IPriceGroup): IOptionType => {return {value: priceGroup.id, label: priceGroup.name}}
}