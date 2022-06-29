import {LocalStorageKeys} from "../LocalStorageKeys";
import {ILanguage} from "../redux/reducers/languages/types";

export class LocalStorageProvider {
    static getToken(): string | null {
        const token = localStorage.getItem(LocalStorageKeys.TokenKey);
        return token;
    }

    static setToken(token: string) {
        localStorage.setItem(LocalStorageKeys.TokenKey, token);
    }

    static removeToken() {
        localStorage.removeItem(LocalStorageKeys.TokenKey)
    }

    static getUser(): string | null {
        return localStorage.getItem(LocalStorageKeys.UsernameKey);
    }

    static setUser(username: string) {
        localStorage.setItem(LocalStorageKeys.UsernameKey, username);
    }

    static removeUser() {
        localStorage.removeItem(LocalStorageKeys.TokenKey)
    }

    static getLanguage(): ILanguage | null {
        const idString = localStorage.getItem(LocalStorageKeys.LanguageIdKey);
        const name = localStorage.getItem(LocalStorageKeys.LanguageNameKey);
        if(idString === null || name === null) {
            this.removeLanguage();
            return null;
        }
        return {
            name: name,
            id: Number(idString)
        }
    }

    static setLanguage(language: ILanguage) {
        localStorage.setItem(LocalStorageKeys.LanguageIdKey, language.id.toString());
        localStorage.setItem(LocalStorageKeys.LanguageNameKey, language.name);

    }

    private static removeLanguage() {
        localStorage.removeItem(LocalStorageKeys.LanguageIdKey)
        localStorage.removeItem(LocalStorageKeys.LanguageNameKey)
    }
}