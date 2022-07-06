import {IOptionType} from "../app/common/SimpleSelect";
import {ILanguage, IWebsite} from "../domain/types";

export default class ToOptionProvider {
    static languageToOption = (language: ILanguage): IOptionType => {return {value: language.id, label: language.name}}

    static websiteToOption = (website: IWebsite): IOptionType => {return {value: website.id, label: website.name}}
}