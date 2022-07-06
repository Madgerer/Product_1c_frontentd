import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {CatalogGroupsState} from "../../../redux/reducers/catalogGroups";
import {actions, CatalogState} from "../../../redux/reducers/catalogs";
import {useEffect} from "react";
import {CatalogGroup} from "../../../domain/types";
import CatalogSelector, {CatalogFilter} from "../../common/catalogSelector/CatalogSelector";
import CatalogGroupSelector from "../../common/catalogGroupsSelector/CatalogGroupSelector";
import "./treeSelectorBlock.scss"

export default function TreeSelectorBlock() {
    // noinspection DuplicatedCode
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

    return <div className="d-inline-block tree-selector-container" >
        <>
            {
                state.selected.id === CatalogGroup.Printed ?
                    <>
                        <h3>Каталог:</h3>
                        <div className="item align-top tree-selector-container-inner">
                            <CatalogSelector filter={state.selected.id === CatalogGroup.Printed
                                ? CatalogFilter.Printed
                                : CatalogFilter.Web}/>
                        </div>
                    </>
                    : <></>
            }
        </>
        <h3>Группа каталогов:</h3>
        <div className="form-group input-group-sm tree-selector-container-inner" >
            <CatalogGroupSelector/>
        </div>
    </div>
}