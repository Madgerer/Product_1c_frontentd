import Navbar from "../navbar/Navbar";
import {Navigate, Route, Routes} from "react-router-dom";
import Product from "../product/Product";
import React from "react";
import "./layout.scss";

function Layout() {

    return <div>
        <Navbar/>
        <div className={"layout-body"}>
            <Routes>
                <Route path={"/products"} element={<Product/>}/>
                <Route path={"/*"} element={<Navigate to="/products" replace />}/>
            </Routes>
        </div>

    </div>
}

export default Layout;