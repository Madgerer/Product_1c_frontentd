import {IOptionType} from "../app/common/SimpleSelect";
import {ILanguage} from "../domain/types";

export default class ToOptionProvider {
    static toOption = (language: ILanguage): IOptionType => {return {value: language.id, label: language.name}}
}