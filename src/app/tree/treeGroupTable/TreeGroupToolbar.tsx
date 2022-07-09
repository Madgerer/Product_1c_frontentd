import SimpleSelect from "../../common/SimpleSelect";
import {useDispatch, useSelector} from "react-redux";
import {actions, TreeComponentState} from "../../../redux/reducers/local/treeComponent";
import {AppState} from "../../../redux/reducers";
import {CatalogGroupsState} from "../../../redux/reducers/catalogGroups";
import {CatalogGroup} from "../../../domain/types";
import {CatalogState} from "../../../redux/reducers/catalogs";
import {recountProductGroupSortThunk} from "../../../redux/reducers/local/treeComponent/thunks";
import "./TreeGroupToolbar.scss"

export default function TreeGroupToolbar() {
    const local = useSelector<AppState, TreeComponentState>(x => x.local.treeComponent);
    const catalogGroupState = useSelector<AppState, CatalogGroupsState>(x => x.catalogGroupState);
    const catalogState = useSelector<AppState, CatalogState>(x => x.catalogState);
    const dispatch = useDispatch();

    function setSortNumber(newValue: string) {
        dispatch(actions.setSortNumber(newValue))
    }

    function selectedCardDistributionType(id: number) {
        dispatch(actions.setSelectedCardType(id))
    }

    function setFilter(newValue: string) {
        dispatch(actions.setFilter(newValue));
    }

    function recountProductGroupsSort() {
        const catalogId = catalogState.selected.id;
        dispatch(recountProductGroupSortThunk({catalogId: catalogId}))
    }

    return <div className="tree-group-toolbar">

        {
            catalogGroupState.selected.id === CatalogGroup.Printed
                ? <>
                    <input onChange={e => setSortNumber(e.currentTarget.value)} value={local.sortNumber} className="form-control input-group-sm tree-group-toolbar__input"/>
                    <button className="btn btn-dark" title="Изменить номер карточки на записанный в поле"><i className="fa fa-arrows-v" aria-hidden="true"></i></button>
                    <button className="btn btn-dark" title="Номер +1"><i className="fa fa-arrow-down" aria-hidden="true"></i></button>
                    <button className="btn btn-dark" title="Номер -1"><i className="fa fa-arrow-up" aria-hidden="true"></i></button>
                </>
                : <></>
        }

        <SimpleSelect value={local.selectedCardType} options={local.cardTypes} onChange={value => selectedCardDistributionType(value)} toOption={e => e} className={"selector"}/>
        <button className="btn btn-dark" title="Удалить выбранные карточки из раздела"><i className="fa fa-minus" aria-hidden="true"></i></button>
        <button className="btn btn-dark" title="Пересчитать порядок карточек" onClick={() => recountProductGroupsSort()}><i className="fa fa-calculator" aria-hidden="true"></i></button>
        <input onChange={e => setFilter(e.currentTarget.value)} value={local.filter} className="form-control" placeholder="Search"/>
    </div>
}