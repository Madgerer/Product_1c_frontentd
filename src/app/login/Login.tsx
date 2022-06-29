import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import './login.scss'
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router";
import {IHistoryState} from "../ProtectedRoute";
import AppRoutes from "../AppRoutes";
import {AppState} from "../../redux/reducers";
import {actions, InputStatus, LoginComponentState} from "../../redux/reducers/local/loginComponent";
import {AuthState} from "../../redux/reducers/auth";
import {loginThunk} from "../../redux/reducers/local/loginComponent/thunks";

function Login() {
    let location = useLocation();
    const navigate = useNavigate();
    const authState = useSelector<AppState, AuthState>(s => s.authState)
    const local = useSelector<AppState, LoginComponentState>(x => x.local.loginComponent);

    /**On mount we check that user already logged and redirect to index, called once**/
    useEffect(() => {
        navigateToIndexIfUsersAlreadyLogged();
    }, []);

    const history = location.state as IHistoryState;
    const dispatch = useDispatch();

    const setPassword = (newPass: string) => {
        dispatch(actions.passwordChanged(newPass));
    }

    const setUsername = (username: string) => {
        dispatch(actions.usernameChanged(username));
    }

    const navigateToIndexIfUsersAlreadyLogged = () =>  {
        if(authState.username != null && authState.token != null)
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
       dispatch(loginThunk({username: local.username, password: local.password}))
       navigateToPreviousPage();
    }

    const isButtonDisabled = local.isLoginDisabled || local.isLoading;
    const usernameErrorClass = `login-error ${local.usernameInputStatus !== InputStatus.AllOkay && local.username.length !== 0 ? "--show" : ""}`;
    const passwordErrorClass = `login-error ${local.passwordInputStatus !== InputStatus.AllOkay && local.password.length !== 0 ? "--show" : ""}`;
    const buttonText = local.isLoading ? "Loading" : "Submit";
    const onLoginErrorClass = `login-error ${local.errorText !== null ? "--show" : ""}`;

    return <div className="login-form-wrapper">
        <form className="login-form" onSubmit={event => {
            event.preventDefault();
            LogIn();
        }}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">User name</label>
                <input className="form-control login-username" type="text" placeholder="Username" id="username" onChange={(s) => setUsername(s.currentTarget.value)} value={local.username}/>
                <span className={usernameErrorClass}>{local.usernameInputStatus}</span>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control login-password" id="password" placeholder="Password" onChange={(s) => setPassword(s.currentTarget.value)} value={local.password}/>
                <span className={passwordErrorClass}>{local.passwordInputStatus}</span>
            </div>
            <button id="submit" disabled={isButtonDisabled} type="submit" className={"btn btn-dark"}>{buttonText}</button>
            <div className={onLoginErrorClass}>{local.errorText}</div>
        </form>
    </div>
}

export default Login;