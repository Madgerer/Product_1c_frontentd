import {Navigate, useLocation} from "react-router-dom";
import React from "react";

export function ProtectedRoute(props: IProtectedRouteProps) {
    const location = useLocation();
    const historyState = {
        from: location.pathname
    }

    return props.isLogged && props.shouldBeLogged
        ? props.children : <Navigate to="/login" state={historyState} replace/>;
}

export interface IHistoryState {
    from: string
}

interface IProtectedRouteProps {
    isLogged: boolean,
    shouldBeLogged: boolean;
    children: JSX.Element
}