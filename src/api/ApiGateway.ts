import AuthApi from "./auth/AuthApi";

interface IApplicationApi {
    auth: AuthApi
}

export class ApiGateway implements IApplicationApi {
    auth: AuthApi;

    constructor() {
        this.auth = new AuthApi();
    }
}