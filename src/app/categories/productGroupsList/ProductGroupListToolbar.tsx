import DistributionTypeSelector from "../../common/distributionSelector/DistributionSelector";
import {useDispatch} from "react-redux";
import {actions} from "../../../redux/reducers/local/categoryComponent";
import "./productGroupListToolbar.scss";

export default function ProductGroupListToolbar(){
    const dispatch = useDispatch();

    function setFilter(filter: string) {
        dispatch(actions.setFilter(filter));
    }

    return <div className="cat-product-group-list-toolbar-container">
        <form className="form-inline">
            <button id="addButton" title="Добавить выделенные карточки в категорию" type="button"
                    className="btn btn-dark"><i className="fa fa-plus" aria-hidden="true"></i></button>
            <div className="cat-product-group-list-toolbar-select-container">
                <DistributionTypeSelector/>
            </div>
            <div className="ml-auto" style={{float: "right"}}>
                <input type="text" className="form-control" placeholder="Search" onChange={e => setFilter(e.target.value)}/>
            </div>
        </form>
    </div>
}