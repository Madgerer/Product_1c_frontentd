import "./product.scss"
import PriceGroupSelector from "../priceGroupSelector/PriceGroupSelector";

function Product() {
    return <div className={"product-body"}>
        <PriceGroupSelector/>
    </div>
}

export default Product;