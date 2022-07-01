import Navbar from "../navbar/Navbar";
import {Navigate, Route, Routes} from "react-router-dom";
import Product from "../product/Product";
import React from "react";

import "./layout.scss";
import Ahahah from "./ExpandableTableComponent";

function Layout() {

    return <div>
        <Navbar/>
        <div className={"layout-body"}>
            <Routes>
                <Route path={"/products"} element={<Product/>}/>
                <Route path={"/try"} element={<Ahahah/>}/>
                <Route path={"/*"} element={<Navigate to="/products" replace />}/>
            </Routes>
        </div>

    </div>
}

export default Layout;

const columns = [
    {
        Header: 'Name',
        columns: [
            {
                Header: 'First Name',
                accessor: 'firstName',
            },
            {
                Header: 'Last Name',
                accessor: 'lastName',
            },
        ],
    },
    {
        Header: 'Info',
        columns: [
            {
                Header: 'Age',
                accessor: 'age',
            },
            {
                Header: 'Visits',
                accessor: 'visits',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Profile Progress',
                accessor: 'progress',
            },
        ],
    },
];

const data = [
    {
        "firstName": "horn-od926",
        "lastName": "selection-gsykp",
        "age": 22,
        "visits": 20,
        "progress": 39,
        "status": "single"
    },
    {
        "firstName": "heart-nff6w",
        "lastName": "information-nyp92",
        "age": 16,
        "visits": 98,
        "progress": 40,
        "status": "complicated"
    },
    {
        "firstName": "minute-yri12",
        "lastName": "fairies-iutct",
        "age": 7,
        "visits": 77,
        "progress": 39,
        "status": "single"
    },
    {
        "firstName": "degree-jx4h0",
        "lastName": "man-u2y40",
        "age": 27,
        "visits": 54,
        "progress": 92,
        "status": "relationship"
    }
]