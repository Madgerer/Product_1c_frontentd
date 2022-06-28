import {Navigate, Route, Routes,} from "react-router-dom";
import {Provider, useDispatch, useSelector} from "react-redux";
import configureAppStore from "../redux/configureStore";
import React from "react";
import {AppState} from "../redux/reducers";
import {ProtectedRoute} from "./ProtectedRoute";

export class App extends React.Component {
    render() {
        return (
            <Provider store={configureAppStore({})}>
                <MainRouter></MainRouter>
            </Provider>
        );
    }
}

function MainRouter() {
    const authState = useSelector((state: AppState) => state.authState)
    const isLogged = authState.token != null && authState.username != null;

    return (<Routes>
        <Route path="login" element={<Login/>}/>
        <Route path="home" element={<Home/>}/>
        <Route path="protected" element={
            <ProtectedRoute isLogged={isLogged}>
                <ProtectedShit/>
            </ProtectedRoute>
        }>
        </Route>
        <Route path="*" element={<Navigate to="home" replace />}/>
    </Routes>);
}

function Home() {
    return <div>Home</div>
}

function ProtectedShit() {
    return <div>ProtectedShit</div>;
}

function Login() {
    const authState = useSelector((state: AppState) => state.authState)
    return <div>
        {authState.username},{authState.token}
    </div>;
}

interface IMainRouterState {
    isLogged: boolean;
}
