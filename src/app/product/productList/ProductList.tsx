import ProductListToolbar from "./ProductListToolbar";
import {Table} from "react-bootstrap";
import "./productList.scss"
import ProductListTable from "./ProductListTable";

function ProductList() {
    return  <div className="product-left-column">
        <ProductListToolbar/>
        <ProductListTable/>
    </div>
}

export default ProductList;