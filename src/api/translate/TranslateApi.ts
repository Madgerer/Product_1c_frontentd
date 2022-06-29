import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";
import {ILanguage} from "../../redux/reducers/languages/types";

export default class TranslateApi extends BaseApi {

    async getLanguages(username: string, password: string): Promise<IApplicationResponse<ILanguage[]>> {
        return await this.sendQuery<ILanguage[]>('/api/translate/lang', null, actionTypes.get, false);
    }
}