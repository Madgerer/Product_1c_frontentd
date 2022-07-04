import "./productGroupList.scss"
import ProductGroupListToolbar from "./ProductGroupListToolbar";
import ProductGroupListTable from "./ProductGroupListTable";

export default function ProductGroupList() {
    return <div className="cat-product-group-list-container">
        <ProductGroupListToolbar/>
        <ProductGroupListTable/>
    </div>
}