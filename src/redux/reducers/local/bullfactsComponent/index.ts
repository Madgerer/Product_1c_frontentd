import {ICatalog, ILanguage, ITranslate, TranslateSource} from "../../../../domain/types";
import {IOptionType} from "../../../../app/common/basic/selectors/SimpleSelect";

export type Translate = ITranslate & { newTranslate: string }

export type BullfactState = {
    translates: Translate[],
    search: string,
    selectedLanguage: ILanguage,

    translateTypes: IOptionType[],
    selectedTranslateType: IOptionType,

    translateSources: IOptionType[],
    selectedTranslateSource: IOptionType
}

const INITIAL_TRANSLATE_TYPES: IOptionType[] = [{value: 0, label: 'Все объекты'}, {value: 1, label: 'Пустые объекты'}]

/*
const INITIAL_STATE: BullfactState = {
    translates: [],
    search: "",
    selectedLanguage: {id: 11, name: "Русский"},

    translateTypes: INITIAL_TRANSLATE_TYPES,
    selectedTranslateType: INITIAL_TRANSLATE_TYPES[0],

    translateSources: []
}*/
