import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
    const saltOrRounds = process.env.REACT_APP_PASSWORD_SALT === undefined
        ? "120123dasdqawezcz"
        : process.env.REACT_APP_PASSWORD_SALT;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
}
