import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";

export default class AuthApi extends BaseApi {
    
    async login(username: string, password: string): Promise<IApplicationResponse<string>> {
        const response = this.sendQuery<string>('/api/auth/', {
            username: username,
            password: password
        }, actionTypes.get, false);
        return response;
    }
}