import {useEffect, useState} from "react";
import {AlphabeticalAndNumericRestrictionsAllStr} from "../../utils/regexpUtlis"
import {useDispatch, useSelector} from "react-redux";
import {actions, AuthState} from "../../redux/reducers/auth";
import Api from "../../api";
import {hashPassword} from "../../utils/passwordHasher";
import {LocalStorageProvider} from "../../api/LocalStorageProvider";
import './login.scss'
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router";
import {IHistoryState} from "../ProtectedRoute";
import {IApplicationResponse} from "../../api/baseTypes";
import AppRoutes from "../AppRoutes";
import {AppState} from "../../redux/reducers";

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
    Empty = ""
}

enum InputType {
    Username,
    Password
}

const INITIAL_STATE: ILoginState = {
    username: "",
    password: "",
    usernameStatus: InputStatus.Empty,
    passwordStatus: InputStatus.Empty,
    isLoading: false
}

function Login() {
    let location = useLocation();
    const navigate = useNavigate();
    const globalAuthState = useSelector<AppState, AuthState>(s => s.authState)

    /**On mount we check that user already logged and redirect to index, called once**/
    useEffect(() => {
        navigateToIndexIfUsersAlreadyLogged();
    }, []);

    const history = location.state as IHistoryState;
    const [state, setState] = useState<ILoginState>({...INITIAL_STATE})
    const regex = AlphabeticalAndNumericRestrictionsAllStr();
    const dispatch = useDispatch();

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

    const isAllFieldsOk = (): boolean => {
        const isUsernameOk = state.usernameStatus === InputStatus.AllOkay;
        const isPasswordOk = state.passwordStatus === InputStatus.AllOkay;
        return isPasswordOk && isUsernameOk;
    }

    const navigateToIndexIfUsersAlreadyLogged = () =>  {
        if(globalAuthState.username != null && globalAuthState.token != null)
            navigate(AppRoutes.Index)
    }

    const navigateToPreviousPage = () => {
        let to: string;
        if(history === undefined) {
            to = AppRoutes.Index;
        } else {
            to = history?.from === location.pathname ? AppRoutes.Index : history?.from
        }
        navigate(to);
    }

    async function LogIn() {
        const isDataValid = isAllFieldsOk();
        if(isDataValid) {

            setState({...state, isLoading: true});

            try {
                const passwordHash = hashPassword(state.password);
                const response = await Api.auth.login(state.username, passwordHash);
                setState({...state, isLoading: false});

                if(!response.success) {
                    handleError(response);
                }
                else {
                    dispatch(actions.setCredentials({
                        token: response.data,
                        username: state.username
                    }))
                    navigateToPreviousPage();
                }
            }
            catch (e) {
                alert("Unexpected error: " + e);
                setState({...state, isLoading: false});
            }
        }
    }

    function handleError(response: IApplicationResponse<string>) {
        if(response.status === 500)
            alert("Server error")
        else if(response.status === 404)
            alert("Server not available")
        else
            alert("Login or password incorrect")
    }

    const isButtonDisabled = !isAllFieldsOk() || state.isLoading;
    const usernameErrorClass = state.usernameStatus !== InputStatus.AllOkay && state.username.length !== 0 ? "--show" : "";
    const passwordErrorClass = state.passwordStatus !== InputStatus.AllOkay && state.password.length !== 0 ? "--show" : ""
    const buttonText = state.isLoading ? "Loading" : "Submit";

    return <div className="login-form-wrapper">
        <form className="login-form" onSubmit={event => {
            event.preventDefault();
            LogIn();
        }}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">User name</label>
                <input className="form-control login-username" type="text" placeholder="Username" id="username" onChange={(s) => setUsername(s.currentTarget.value)}/>
                <span className={`login-error ${usernameErrorClass}`}>{state.usernameStatus}</span>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control login-password" id="password" placeholder="Password" onChange={(s) => setPassword(s.currentTarget.value)}/>
                <span className={`login-error ${passwordErrorClass}`}>{state.passwordStatus}</span>
            </div>
            <button id="submit" disabled={isButtonDisabled} type="submit" className={"btn btn-dark"}>{buttonText}</button>
        </form>
    </div>
}

export default Login;