import axios, { AxiosError, AxiosResponse } from 'axios';
import {IApplicationResponse} from "./baseTypes";


/**
 * Класс обертка на axios для обработки реквест параметров.
 */
class HttpActions {
    // @ts-ignore
    static getFullUrl(url: string, params: object): string {

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
    static async get<T>(url: string, data: object): Promise<IApplicationResponse<T>> {
        const urlWithArguments = HttpActions.getFullUrl(url, data);
        return axios.get(urlWithArguments)
            .then(x => this.processResponse(x))
            .catch((e) => HttpActions.getErrorObject(e));
    }

    /** Функция выполняет Post запрос на сервер **/
    static post<T>(url: string, data: object): Promise<IApplicationResponse<T>>  {
        return axios.post(url, data)
            .then(x => this.processResponse(x))
            .catch((e) => HttpActions.getErrorObject(e));
    }

    /** Функция выполняет Put запрос на сервер */
    static put<T>(url: string, data: object): Promise<IApplicationResponse<T>>  {
        return axios.put(url, data)
            .then(x => this.processResponse(x))
            .catch((e) => HttpActions.getErrorObject(e));
    }

    /** Функция выполняет Remove запрос на сервер */
    static delete<T>(url: string, data: object): Promise<IApplicationResponse<T>>  {
        return axios.delete(url, data)
            .then(x => this.processResponse(x))
            .catch((e) => HttpActions.getErrorObject(e));
    }

    static processResponse<T>(response: AxiosResponse<T>): IApplicationResponse<T>{
        const isFailure = [200, 201].indexOf(response?.status) !== -1
        return {
            status: response.status,
            data: response?.data,
            success: !isFailure,
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
}

export default HttpActions;
