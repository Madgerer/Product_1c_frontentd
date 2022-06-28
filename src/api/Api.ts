import AuthApi from "./auth/AuthApi";

interface IApplicationApi {
    auth: AuthApi
}

export class Api implements IApplicationApi {
    auth: AuthApi;

    constructor(baseUrl = "") {
        this.auth = new AuthApi(baseUrl);
    }
}