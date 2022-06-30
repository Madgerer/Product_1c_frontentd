import ProductGroupListToolbar from "./ProductGroupListToolbar";
import "./productGroupList.scss"
import ProductGroupListTable from "./ProductGroupListTable";

function ProductGroupList() {
    return <div className="product-right-column">
        <ProductGroupListToolbar/>
        <ProductGroupListTable/>
    </div>
}

export default ProductGroupList