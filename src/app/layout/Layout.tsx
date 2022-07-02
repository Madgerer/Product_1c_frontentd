import Navbar from "../common/navbar/Navbar";
import {Navigate, Route, Routes} from "react-router-dom";
import Product from "../product/Product";
import React from "react";

import "./layout.scss";
import Categories from "../categories/Categories";

function Layout() {

    return <div>
        <Navbar/>
        <div className={"layout-body"}>
            <Routes>
                <Route path={"/products"} element={<Product/>}/>
                <Route path={"/try"} element={<Categories/>}/>
                <Route path={"/*"} element={<Navigate to="/products" replace />}/>
            </Routes>
        </div>

    </div>
}

export default Layout;