import Navbar from "../common/navbar/Navbar";
import {Navigate, Route, Routes} from "react-router-dom";
import Product from "../product/Product";
import React from "react";

import "./layout.scss";
import Categories from "../categories/Categories";
import Tree from "../tree/Tree";
import Translate from "../translates/Translate";
import NewProduct from "../newProduct/NewProduct";

function Layout() {

    return <div>
        <Navbar/>
        <div className={"layout-body"}>
            <Routes>
                <Route path={"/products"} element={<Product/>}/>
                <Route path={"/categories"} element={<Categories/>}/>
                <Route path={"/tree"} element={<Tree/>}/>
                <Route path={"/translate"} element={<Translate/>}/>
                <Route path={"/try"} element={<NewProduct/>}/>
                <Route path={"/*"} element={<Navigate to="/products" replace />}/>
            </Routes>
        </div>

    </div>
}

export default Layout;