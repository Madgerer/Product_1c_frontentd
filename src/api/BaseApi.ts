import queryTypes, {ActionType, IApplicationResponse} from "./baseTypes";
import HttpActions from './HttpActions';

export default class BaseApi {
    baseUrl: string;

    constructor() {
        this.baseUrl = process.env.REACT_APP_SERVER_API === undefined ? "http://localhost:5000" : process.env.REACT_APP_SERVER_API;
        if(this.baseUrl.at(this.baseUrl.length - 1) === "/")
            this.baseUrl = this.baseUrl.substring(0, this.baseUrl.length - 1)
    }

    protected async sendQuery<T>(url: string, data: object | null, method: ActionType, authorized: boolean): Promise<IApplicationResponse<T>> {
        url = this.baseUrl + url;
        const responseMethods = {
            [queryTypes.post]: async () => HttpActions.post<T>(url, data, authorized),
            [queryTypes.get]: async () => HttpActions.get<T>(url, data, authorized),
            [queryTypes.put]: async () => HttpActions.put<T>(url, data, authorized),
            [queryTypes.delete]: async () => HttpActions.delete<T>(url, data, authorized),
        };

        const response = await responseMethods[method]();
        return response;
    }
}