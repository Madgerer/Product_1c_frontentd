import bcrypt from 'bcryptjs'

export function hashPassword(password: string): string {
    const saltSeed: number = process.env.REACT_APP_PASSWORD_SALT_SEED === undefined
        ? 180
        : Number(process.env.REACT_APP_PASSWORD_SALT_SEED);
    const salt = bcrypt.genSaltSync(saltSeed);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}
