import {LocalStorageKeys} from "../../../v1/product-1c-frontend/src/LocalStorageKeys";

export class TokenProvider {
    static get(): string {
        throw "Unauthorized";

    }

    static set(token: string) {
        //localStorage.setItem(LocalStorageKeys.TokenKey, token);
    }
}