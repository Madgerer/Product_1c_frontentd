import CatalogSelector from "../../common/catalogSelector/CatalogSelector";
import "./selectorBlock.scss"
import PriceGroupSelector from "../../common/priceGroupSelector/PriceGroupSelector";
import SellmarkSelector from "../../common/sellmarkSelector/SellmarkSelector";
import CatalogGroupSelector from "../../common/catalogGroupsSelector/CatalogGroupSelector";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {CatalogGroup, CatalogGroupsState} from "../../../redux/reducers/catalogGroups";
import {useEffect} from "react";
import {actions, CatalogState} from "../../../redux/reducers/catalogs";


export default function SelectorBlock() {
    const state = useSelector<AppState, CatalogGroupsState>(x => x.catalogGroupState)
    const catalogState = useSelector<AppState, CatalogState>(x => x.catalogState)
    const dispatch = useDispatch();

    useEffect(() => {
        const selected =  state.selected.id === CatalogGroup.Printed
            ? catalogState.catalogs.find(x => x.isPrinted)
            : catalogState.catalogs.find(x => !x.isPrinted);
        if(selected !== undefined)
            dispatch(actions.setSelected(selected!.id))
    },[state.selected.id])

    return <div className="d-inline-block cat-selector-container" >
        <>
            <h3>Каталог:</h3>
            <div className="item align-top cat-selector-container-inner">
                <CatalogSelector isPrinted={state.selected.id === CatalogGroup.Printed}/>
            </div>
        </>
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