import BaseApi from "../BaseApi";
import actionTypes, {IApplicationResponse} from "../baseTypes";

export default class AuthApi extends BaseApi {

    login = async (authData: {username: string, password: string}): Promise<IApplicationResponse<string>> =>
        this.sendQuery<string>('/api/auth/', authData, actionTypes.get, false);
}