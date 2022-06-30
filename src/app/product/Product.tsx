import "./product.scss"
import ProductList from "./productList/ProductList";
import ProductGroupList from "./productGroupList/ProductGroupList";

function Product() {
    return <div className="product-body">
        <ProductList/>
        <ProductGroupList/>
    </div>
}

export default Product;