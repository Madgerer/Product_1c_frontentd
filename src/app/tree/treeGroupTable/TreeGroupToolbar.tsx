import SimpleSelect from "../../common/SimpleSelect";
import {useSelector} from "react-redux";
import {TreeComponentState} from "../../../redux/reducers/local/treeComponent";
import {AppState} from "../../../redux/reducers";
import {CatalogGroupsState} from "../../../redux/reducers/catalogGroups";
import {CatalogGroup} from "../../../domain/types";

export default function TreeGroupToolbar() {
    const local = useSelector<AppState, TreeComponentState>(x => x.local.treeComponent);
    const catalogGroupState = useSelector<AppState, CatalogGroupsState>(x => x.catalogGroupState);
    return <div>

        {
            catalogGroupState.selected.id === CatalogGroup.Printed
                ? <>
                    <input />
                    <button className="btn btn-dark"><i className="fa fa-arrows-v" aria-hidden="true"></i></button>
                    <button className="btn btn-dark"><i className="fa fa-arrow-down" aria-hidden="true"></i></button>
                    <button className="btn btn-dark"><i className="fa fa-arrow-up" aria-hidden="true"></i></button>
                </>
                : <></>
        }

        <SimpleSelect value={local.selectedCardType} options={local.cardTypes} onChange={value => {}} toOption={e => e} className={"selector"}/>
        <button className="btn btn-dark"><i className="fa fa-minus" aria-hidden="true"></i></button>
        <button className="btn btn-dark"><i className="fa fa-calculator" aria-hidden="true"></i></button>
        <input/>
    </div>
}