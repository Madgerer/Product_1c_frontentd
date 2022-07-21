import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {useEffect} from "react";
import {isUndefined} from "lodash";
import {actions, CatalogState} from "../../../redux/reducers/catalogs";
import {getCatalogsThunk} from "../../../redux/reducers/catalogs/thunk";
import SimpleSelect, {IOptionType} from "../basic/selectors/SimpleSelect";
import {ICatalog} from "../../../domain/types";

const toOption = (catalog: ICatalog): IOptionType => {
    return {
        value: catalog.id,
        label: catalog.name
    }
}

function CatalogSelector(props: ICatalogSelectorGroups) {

    const state = useSelector<AppState, CatalogState>(s => s.catalogState);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCatalogsThunk())
    }, []);

    const selected = state.catalogs.find(x => x.id === state.selected.id)
    if(isUndefined(selected)) {
        dispatch(actions.setSelected(state.catalogs[0].id))
    }

    const changeSelected = (id: number) => {
        dispatch(actions.setSelected(id));
    }

    const filtered = props.filter == CatalogFilter.All
        ? state.catalogs
        : props.filter == CatalogFilter.Web
            ? state.catalogs.filter(x => !x.isPrinted)
            : state.catalogs.filter(x => x.isPrinted)

    return <SimpleSelect toOption={toOption}
                         options={filtered}
                         className={"selector"}
                         onChange={newValue => changeSelected(newValue)}
                         value={state.selected}
    />
}

interface ICatalogSelectorGroups {
    filter: CatalogFilter
}

export enum CatalogFilter {
    All,
    Printed,
    Web
}

export default CatalogSelector