import {ILanguage, ITranslate} from "../../../../domain/types";

export type Translate = ITranslate & { newTranslate: string }

export type bullfactState = {
    translates: Translate[],
    search: string,
    selectedLanguage: ILanguage,


}