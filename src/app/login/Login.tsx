import {useState} from "react";
import {AlphabeticalAndNumericRestrictionsAllStr} from "../../utils/regexp-utlis"
import './login.scss'
import {stat} from "fs";
import {Api} from "../../api/Api";

interface ILoginState {
    username: string;
    password: string;
    usernameStatus: InputStatus,
    passwordStatus: InputStatus,
    isLoading: boolean
}

enum InputStatus {
    AllOkay = "All okay",
    RestrictedSymbolsNotAllowed = "Use only alphabetical and numerical characters",
    PasswordLengthNotOkay = "Length should be 3-20 characters",
    UsernameLengthNotOkay = "Length should be 3-20 characters",
}

enum InputType {
    Username,
    Password
}

const INITIAL_STATE: ILoginState = {
    username: "",
    password: "",
    usernameStatus: InputStatus.AllOkay,
    passwordStatus: InputStatus.AllOkay,
    isLoading: false
}

function Login() {
    const [state, setState] = useState<ILoginState>({...INITIAL_STATE})
    const regex = AlphabeticalAndNumericRestrictionsAllStr();

    const setPassword = (newPass: string) => {
        const status = checkPassword(newPass);
        setState({...state, password: newPass, passwordStatus: status})
    }
    const checkPassword = (pass: string): InputStatus => {
        return validateString(pass, 3, 20, regex, InputType.Password);
    }

    const setUsername = (username: string) => {
        const status = checkUsername(username);
        setState({...state, username: username, usernameStatus: status})
    }
    const checkUsername = (username: string): InputStatus => {
        return validateString(username, 3, 20, regex, InputType.Username);
    }

    const validateString = (str: string, minLength: number, maxLength: number, regexp: RegExp, inputType: InputType) => {
        const noRestricted = regexp.test(str);
        if(!noRestricted)
            return InputStatus.RestrictedSymbolsNotAllowed;
        if(str.length >= minLength && str.length <= maxLength)
            return InputStatus.AllOkay;
        switch (inputType)
        {
            case InputType.Password:
                return InputStatus.PasswordLengthNotOkay;
            case InputType.Username:
                return InputStatus.UsernameLengthNotOkay;
        }
    }

    async function LogIn() {
        const isUsernameOk = state.usernameStatus == InputStatus.AllOkay;
        const isPasswordOk = state.passwordStatus == InputStatus.AllOkay;
        const isDataValid = isPasswordOk && isUsernameOk
        if(isDataValid) {
            setState({...state, isLoading: true});
        }
    }

    return <div className="form-wrapper">
        <form action="" className="login-form">
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">User name</label>
                <input className="form-control login-username" type="text" placeholder="Username" id="username" onChange={(s) => setUsername(s.currentTarget.value)}/>
                <span className={`login-error ${state.usernameStatus !== InputStatus.AllOkay && state.username.length !== 0 ? "--show" : ""}`}>{state.usernameStatus}</span>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control login-password" id="password" placeholder="Password" onChange={(s) => setPassword(s.currentTarget.value)}/>
                <span className={`login-error ${state.passwordStatus !== InputStatus.AllOkay && state.password.length !== 0 ? "--show" : ""}`}>{state.passwordStatus}</span>
            </div>
            <button id="submit" type="button" className="btn btn-dark">Submit</button>
        </form>
    </div>
}

export default Login;