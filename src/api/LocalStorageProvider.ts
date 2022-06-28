import {LocalStorageKeys} from "../LocalStorageKeys";

export class LocalStorageProvider {
    static getToken(): string | null {
        const token = localStorage.getItem(LocalStorageKeys.TokenKey);
        return token;
    }

    static setToken(token: string) {
        localStorage.setItem(LocalStorageKeys.TokenKey, token);
    }

    static setUser(username: string) {
        localStorage.setItem(LocalStorageKeys.UsernameKey, username);
    }

    static getUser(): string | null {
        return localStorage.getItem(LocalStorageKeys.UsernameKey);
    }
}