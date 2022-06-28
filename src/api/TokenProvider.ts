import {LocalStorageKeys} from "../LocalStorageKeys";

export class TokenProvider {
    static get(): string {
        let token = localStorage.getItem(LocalStorageKeys.TokenKey);
        if(token === null)
            throw "Unauthorized";
        return token;
    }

    static set(token: string) {
        localStorage.setItem(LocalStorageKeys.TokenKey, token);
    }
}