import Navbar from "../navbar/Navbar";
import {Navigate, Route, Routes} from "react-router-dom";
import Product from "../product/Product";
import React from "react";

function Layout() {

    return <div>
        <Navbar/>
        <Routes>
            <Route path={"/products"} element={<Product/>}/>
            <Route path={"/*"} element={<Navigate to="/products" replace />}/>
        </Routes>
    </div>
}

export default Layout;