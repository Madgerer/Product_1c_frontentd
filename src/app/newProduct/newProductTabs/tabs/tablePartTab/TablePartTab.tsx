import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../../redux/reducers";
import {actions, NewProductState} from "../../../../../redux/reducers/local/newProduct";
import ProductAttributesBlock from "./ProductAttributesBlock";
import "./tablePartTab.scss"
import {useEffect} from "react";
import {IMountableProps} from "../../../../../redux/types";

export default function TablePartTab(props: IMountableProps) {
    const productGroupState = useSelector<AppState, NewProductState>(x => x.local.newProductState.common)
    const dispatch = useDispatch()

    useEffect(() => {
        props.onMount()
    }, [])

    const setDescr = (value) => dispatch(actions.setDescription(value))
    const setWebDescr = (value) => dispatch(actions.setWebDescription(value))

    return <div id="products" className="tab-pane">
        <div className="tab-pane-row" >
            <div className="tab-pane-column" >
                <div className="tab-pane-textarea-header" ><h6>Техническое описание</h6></div>
                <textarea className="form-control" style={{height: 130}} rows={3} onChange={(e) => setDescr(e.target.value)}>{productGroupState.productGroup.description}</textarea>
            </div>
            <div className="tab-pane-column" >
                <div className="tab-pane-textarea-header" ><h6>Техническое описание карточки товара</h6></div>
                <textarea className="form-control" style={{height: 130}} rows={3} onChange={(e) => setWebDescr(e.target.value)}>{productGroupState.productGroup.descriptionWeb}</textarea>
            </div>
        </div>
        {
            productGroupState.isPriceGroupChanged
                ? <>Сохраните изменения, прежде чем продолжить работу с данным блоком</>
                : <ProductAttributesBlock/>
        }
    </div>
}