import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {ILanguage, ITranslate} from "../../domain/types";

export default class TranslateApi extends BaseApi {

    getLanguages = (): Promise<IApplicationResponse<ILanguage[]>> =>
        this.sendQuery<ILanguage[]>('/api/translate/lang', null, actionTypes.get, true);

    getTranslates = (data: {catalogId: number, translateSource: number, targetLanguageId: number, search: string, isEmpty: boolean})
                     : Promise<IApplicationResponse<ITranslate[]>> =>
        this.sendQuery<ITranslate[]>('/api/translate', data, actionTypes.get, true)

    updateTranslates = (data: {translateId: number, translate: string, translateSource: number, sourceId: string, languageId: number})
                    : Promise<IApplicationResponse<void>> =>
        this.sendQuery<void>('/api/translate', data, actionTypes.put, true)
}