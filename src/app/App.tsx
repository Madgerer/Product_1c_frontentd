import {Navigate, Route, Routes,} from "react-router-dom";
import {Provider, useDispatch, useSelector} from "react-redux";
import configureAppStore from "../redux/configureStore";
import React from "react";
import {AppState} from "../redux/reducers";
import {ProtectedRoute} from "./ProtectedRoute";
import Login from "./login/Login";
import Api from "../api";

export interface IThunkExtraParam {
    api: Api;
}

const extra = {
    api: new Api('')
}

export class App extends React.Component {
    render() {
        return (
            <Provider store={configureAppStore({}, extra)}>
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
