import {SHA256} from 'crypto-js'

export function hashPassword(password: string): string {
    let hash = SHA256(password).toString()
    return hash;
}
