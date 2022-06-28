import {Navigate, useLocation} from "react-router-dom";
import React from "react";

export function ProtectedRoute(props: IProtectedRouteProps) {
    let location = useLocation();
    return props.isLogged ? props.children : <Navigate to="/login" state={{from: location}} replace/>;
}

interface IProtectedRouteProps {
    isLogged: boolean,
    children: JSX.Element
}