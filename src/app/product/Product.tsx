import "./product.scss"
import ProductList from "./productList/ProductList";
import ProductGroupList from "./productGroupList/ProductGroupList";
import {useLayoutEffect} from "react";
import {useDispatch} from "react-redux";
import {actions as productListActions} from "../../redux/reducers/local/productComponent/productList";
import {actions as productGroupsListActions} from "../../redux/reducers/local/productComponent/productGroupList";

function Product() {
    const dispatch = useDispatch();

    useLayoutEffect (() => {
        return function () {
            dispatch(productListActions.clearStateOnUnmount())
            dispatch(productGroupsListActions.clearStateOnUnmount())
        }
    }, [])

    return <div className="product-body">
        <ProductList/>
        <ProductGroupList/>
    </div>
}

export default Product;