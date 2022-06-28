import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";

export default class AuthApi extends BaseApi {
    
    async login(login: string, password: string): Promise<IApplicationResponse<string>> {
        const response = this.sendQuery<string>('/auth/api', {
            login: login,
            password: password
        }, actionTypes.get);
        return response;
    }
}