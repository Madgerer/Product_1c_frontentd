import {LocalStorageKeys} from "./LocalStorageKeys";

export default class TokenService {
    isUserLogged(): boolean {
        let token = window.localStorage.getItem(LocalStorageKeys.TokenKey);
        return token != null;

    }
}