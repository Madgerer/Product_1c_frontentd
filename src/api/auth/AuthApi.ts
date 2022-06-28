import BaseApi from "../BaseApi";
import axios, {AxiosResponse} from "axios";
import actionTypes, {ActionType} from "../queryTypes";
import {IApplicationResponse} from "../HttpActions";

export default class AuthApi extends BaseApi {

    constructor(baseUrl: string) {
        super(baseUrl);
    }

    async login(login: string, password: string): Promise<IApplicationResponse<string>> {
        const response = this.sendQuery<string>('/auth/api', {
            login: login,
            password: password
        }, actionTypes.get);
        return response;
    }
}