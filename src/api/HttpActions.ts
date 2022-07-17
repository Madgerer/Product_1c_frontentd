import axios, {AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse} from 'axios';
import {IApplicationResponse} from "./baseTypes";
import {LocalStorageProvider} from "./LocalStorageProvider";

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

    /** Функция выполняет Post запрос с файлом/файлами на сервер **/
    static postFile<T>(url: string, data: object | null, authorized: boolean): Promise<IApplicationResponse<T>> {
        let form: FormData | null = null;
        if(data === null)
            console.error('File is empty')
        else {
            form = new FormData()
            for(const key in data) {
                form.set(key, data[key])
            }
        }
        return axios.post(url, form, {headers: this.getFileHeaders(authorized)})
            .then(x => this.processResponse(x))
            .catch(e => HttpActions.getErrorObject(e))
    }

    /** Функция выполняет Put запрос на сервер */
    static put<T>(url: string, data: object | null, authorized: boolean): Promise<IApplicationResponse<T>>  {
        return axios.put(url, data, {headers: this.getHeaders(authorized)})
            .then(x => this.processResponse(x))
            .catch((e) => HttpActions.getErrorObject(e));
    }

    /** Функция выполняет Put запрос с файлом/файлами на сервер **/
    static putFile<T>(url: string, data: object | null, authorized: boolean): Promise<IApplicationResponse<T>> {
        let form: FormData | null = null;
        if(data === null)
            console.error('File is empty')
        else {
            form = new FormData()
            for(const key in data) {
                form.set(key, data[key])
            }
        }
        return axios.post(url, form, {headers: this.getFileHeaders(authorized)})
            .then(x => this.processResponse(x))
            .catch(e => HttpActions.getErrorObject(e))
    }

    /** Функция выполняет Remove запрос на сервер */
    static delete<T>(url: string, data: object | null, authorized: boolean): Promise<IApplicationResponse<T>>  {
        const urlWithArguments = HttpActions.getFullUrl(url, data);
        return axios.delete(urlWithArguments, {headers: this.getHeaders(authorized)})
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
            status: response !== undefined
                ? response.status !== undefined
                    ? response.status : -1
                : -1,
            data: null,
            exception: {
                text: JSON.stringify(error.response?.data) ?? JSON.stringify(error.response?.statusText) ?? "Connection_Error"
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
            headers["authorization"] = `Bearer ${LocalStorageProvider.getToken()}`;
        return headers;
    }

    static getFileHeaders(authorized: boolean): AxiosRequestHeaders {
        let headers = this.getHeaders(authorized);
        headers["content-type"] = "multipart/form-data"
        return headers;
    }
}

export default HttpActions;
