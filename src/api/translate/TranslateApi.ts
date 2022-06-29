import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";

export default class TranslateApi extends BaseApi {

    async getLanguages(username: string, password: string): Promise<IApplicationResponse<string>> {
        const response = this.sendQuery<string>('/api/auth/', {
            username: username,
            password: password
        }, actionTypes.get, false);
        return response;
    }
}