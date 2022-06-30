import ProductListToolbar from "./ProductListToolbar";
import {Table} from "react-bootstrap";
import "./productList.scss"
import ProductListTable from "./ProductListTable";

function ProductList() {
    return  <div className="h-100 d-inline-block product-left-column">
        <ProductListToolbar/>
        <ProductListTable/>
    </div>
}

export default ProductList;