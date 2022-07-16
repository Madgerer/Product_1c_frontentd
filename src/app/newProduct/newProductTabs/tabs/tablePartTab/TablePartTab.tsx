import {useSelector} from "react-redux";
import {AppState} from "../../../../../redux/reducers";
import {NewProductState} from "../../../../../redux/reducers/local/newProduct";
import ProductAttributesBlock from "./ProductAttributesBlock";

export default function TablePartTab() {
    const productGroupState = useSelector<AppState, NewProductState>(x => x.local.newProductState.common)

    return <div id="products" className="tab-pane row">
        <div className="row" style={{marginRight:20}}>
            <div className="col-md-6 table-sm" style={{marginTop: 15, lineHeight: 0.6, fontSize: 13}}>
                <div className="col-md-12" style={{textAlign: "center"}}><h6>Техническое описание</h6></div>
                <textarea className="form-control" style={{height: 130}} rows={3}></textarea>
            </div>
            <div className="col-md-6 table-sm" style={{marginTop: 15, lineHeight: 0.6, fontSize: 13}}>
                <div className="col-md-12" style={{textAlign: "center"}}><h6>Техническое описание карточки товара</h6></div>
                <textarea className="form-control" style={{height: 130}} rows={3}></textarea>
            </div>
        </div>
        {
            productGroupState.isPriceGroupChanged
                ? <>Сохраните изменения, прежде чем продолжить работу с данным блоком</>
                : <ProductAttributesBlock/>
        }
    </div>
}