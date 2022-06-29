import axios, {AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse} from 'axios';
import {IApplicationResponse} from "./baseTypes";
import {LocalStorageProvider} from "./LocalStorageProvider";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {isNull} from "lodash";



/**
 * Класс обертка на axios для обработки реквест параметров.
 */
class HttpActions {
    // @ts-ignore
    static getFullUrl(url: string, params: object | null): string {

        let fullUrl = url;
        if (params) {
            let paramsArray = Object
                .keys(params)
                .filter((param) => {
                    const value = params[param];
                    return ['', undefined, null].indexOf(value) === -1;
                });

            paramsArray = paramsArray.map(
                (param) => `${param}=${encodeURIComponent(params[param])}`,
            );

            fullUrl += `?${paramsArray.join('&')}`;
        }
        return fullUrl;
    }

    /** Функция выполняет Get запрос на сервер */
    static async get<T>(url: string, data: object | null, authorized: boolean): Promise<IApplicationResponse<T>> {
        const urlWithArguments = HttpActions.getFullUrl(url, data);

        return axios.get(urlWithArguments, {headers: this.getHeaders(authorized)})
            .then(x => this.processResponse(x))
            .catch((e) => HttpActions.getErrorObject(e));
    }

    /** Функция выполняет Post запрос на сервер **/
    static post<T>(url: string, data: object | null, authorized: boolean): Promise<IApplicationResponse<T>>  {
        return axios.post(url, data, {headers: this.getHeaders(authorized)})
            .then(x => this.processResponse(x))
            .catch((e) => HttpActions.getErrorObject(e));
    }

    /** Функция выполняет Put запрос на сервер */
    static put<T>(url: string, data: object | null, authorized: boolean): Promise<IApplicationResponse<T>>  {
        return axios.put(url, data, {headers: this.getHeaders(authorized)})
            .then(x => this.processResponse(x))
            .catch((e) => HttpActions.getErrorObject(e));
    }

    /** Функция выполняет Remove запрос на сервер */
    static delete<T>(url: string, data: object | null, authorized: boolean): Promise<IApplicationResponse<T>>  {
        return axios.delete(url, {headers: this.getHeaders(authorized)})
            .then(x => this.processResponse(x))
            .catch((e) => HttpActions.getErrorObject(e));
    }

    static processResponse<T>(response: AxiosResponse<T>): IApplicationResponse<T>{
        const isSuccess = [200, 201].indexOf(response?.status) !== -1
        return {
            status: response.status,
            data: response?.data,
            success: isSuccess,
            exception: null
        }
    }

    static getErrorObject<T>(error: AxiosError): IApplicationResponse<T> {
        const { response } = error;
        return {
            success: false,
            status: response!.status,
            data: null,
            exception: {
                text: JSON.stringify(error.response?.data)
            }
        };
    }

    static getConfig(authorized: boolean): AxiosRequestConfig {
        const headers = this.getHeaders(authorized);
        return {
            headers: headers,
            withCredentials: true
        };
    }

    static getHeaders(authorized: boolean): AxiosRequestHeaders {
        let headers = {
            "content-type": "application/json",
            "accept" : "application/json",
            "Access-Control-Allow-Origin": "*"
        }
        if(authorized)
            headers["authorization"] = LocalStorageProvider.getToken()
        return headers;
    }
}

export default HttpActions;
