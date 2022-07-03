import CatalogSelector from "../../common/catalogSelector/CatalogSelector";
import "./selectorBlock.scss"
import PriceGroupSelector from "../../common/priceGroupSelector/PriceGroupSelector";
import SellmarkSelector from "../../common/sellmarkSelector/SellmarkSelector";
import CatalogGroupSelector from "../../common/catalogGroupsSelector/CatalogGroupSelector";
import {useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {CatalogGroup, CatalogGroupsState} from "../../../redux/reducers/catalogGroups";


export default function SelectorBlock() {
    const state = useSelector<AppState, CatalogGroupsState>(x => x.catalogGroupState)
    const catGroupWithCatalogsView = 1;

    return <div className="d-inline-block cat-selector-container" >
        {
            state.selected.id === catGroupWithCatalogsView
                ? <>
                    <h3>Каталог:</h3>
                    <div className="item align-top cat-selector-container-inner">
                        <CatalogSelector isPrinted={state.selected.id === CatalogGroup.Printed}/>
                    </div>
                </>
                : <></>
        }
        <h3>Ценовая группа:</h3>
        <div className="cat-selector-container-inner">
            <PriceGroupSelector/>
        </div>
        <h3>Торговая марка:</h3>
        <div className="cat-selector-container-inner">
            <SellmarkSelector/>
        </div>
        <h3>Группа каталогов:</h3>
        <div className="form-group input-group-sm cat-selector-container-inner" >
            <CatalogGroupSelector/>
        </div>
    </div>
}