import {Navigate, Route, Routes,} from "react-router-dom";
import {Provider, useDispatch, useSelector} from "react-redux";
import React from "react";
import {AppState} from "../redux/reducers";
import {ProtectedRoute} from "./ProtectedRoute";
import {ApiGateway} from "../api/ApiGateway";
import Login from "./login/Login";
import configureAppStore from "../redux/configureStore";

export interface IThunkExtraParam {
    api: ApiGateway;
}

export class App extends React.Component {
    render() {
        return (
            <Provider store={configureAppStore({}, /*extra*/)}>
                <MainRouter></MainRouter>
            </Provider>
        );
    }
}

function MainRouter() {
    const authState = useSelector((state: AppState) => state.authState)
    const isLogged = authState.token != null && authState.username != null;

    return (<Routes>
        <Route path="login" element={<Login/>}>
        </Route>
        <Route path="/" element={
            <ProtectedRoute isLogged={isLogged} shouldBeLogged={true}>
                <ProtectedShit/>
            </ProtectedRoute>
        }>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />}/>
    </Routes>);

    /**/
}

function ProtectedShit() {
    return <div>ProtectedShit</div>;
}
