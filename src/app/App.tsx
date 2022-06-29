import {Navigate, Route, Routes,} from "react-router-dom";
import {Provider, useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {AppState} from "../redux/reducers";
import {ProtectedRoute} from "./ProtectedRoute";
import Login from "./login/Login";
import configureAppStore from "../redux/configureStore";
import Layout from "./layout/Layout";

export function App(){
    return (
        <Provider store={configureAppStore({})}>
            <MainRouter></MainRouter>
        </Provider>
    );
}

function MainRouter() {
    const authState = useSelector((state: AppState) => state.authState)
    const isLogged = authState.token != null && authState.username != null;

    return (<Routes>
        <Route path="login" element={<Login/>}>
        </Route>
        <Route path="/*" element={
            <ProtectedRoute isLogged={isLogged} shouldBeLogged={true}>
                <Layout/>
            </ProtectedRoute>
        }>
        </Route>
    </Routes>)

    /**/
}
