import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {ILanguage} from "../../domain/types";

export default class TranslateApi extends BaseApi {

    getLanguages = (): Promise<IApplicationResponse<ILanguage[]>> =>
        this.sendQuery<ILanguage[]>('/api/translate/lang', null, actionTypes.get, true);
}