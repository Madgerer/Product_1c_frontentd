import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {useEffect} from "react";
import {isUndefined} from "lodash";
import {actions, CatalogState} from "../../../redux/reducers/catalogs";
import {getCatalogs} from "../../../redux/reducers/catalogs/thunk";
import SimpleSelect, {IOptionType} from "../SimpleSelect";
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
        dispatch(getCatalogs())
    }, []);

    const selected = state.catalogs.find(x => x.id === state.selected.id)
    if(isUndefined(selected)) {
        dispatch(actions.setSelected(state.catalogs[0].id))
    }

    const changeSelected = (id: number) => {
        dispatch(actions.setSelected(id));
    }

    return <SimpleSelect toOption={toOption}
                         options={state.catalogs.filter(x => x.isPrinted === props.isPrinted)}
                         className={"selector"}
                         onChange={newValue => changeSelected(newValue)}
                         value={state.selected}
    />
}

interface ICatalogSelectorGroups {
    isPrinted: boolean
}

export default CatalogSelector