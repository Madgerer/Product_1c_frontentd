import queryTypes, {ActionType} from "./queryTypes";
import HttpActions, {IApplicationResponse} from './HttpActions';
import {AxiosResponse} from "axios";

export default class BaseApi {
    baseUrl = '';

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async sendQuery<T>(url: string, data: object, method: ActionType): Promise<IApplicationResponse<T>> {
        const responseMethods = {
            [queryTypes.post]: async () => HttpActions.post<T>(url, data),
            [queryTypes.get]: async () => HttpActions.get<T>(url, data),
            [queryTypes.put]: async () => HttpActions.put<T>(url, data),
            [queryTypes.delete]: async () => HttpActions.delete<T>(url, data),
        };

        const response = await responseMethods[method]();
        return response;
    }
}