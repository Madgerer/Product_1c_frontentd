import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux/reducers";
import {actions, PriceGroupState} from "../../redux/reducers/priceGroups";
import {useEffect} from "react";
import {uploadPriceGroups} from "../../redux/reducers/priceGroups/thunk";
import {isUndefined} from "lodash";
import {CatalogState} from "../../redux/reducers/catalogs";
import {uploadCatalogs} from "../../redux/reducers/catalogs/thunk";
import SimpleSelect, {IOptionType} from "../common/SimpleSelect";
import {ICatalog} from "../../redux/reducers/catalogs/types";

const toOption = (catalog: ICatalog): IOptionType => {
    return {
        value: catalog.id,
        label: catalog.name
    }
}

function CatalogSelector() {

    const state = useSelector<AppState, CatalogState>(s => s.catalogState);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(uploadCatalogs())
    }, []);

    const selected = state.catalogs.find(x => x.id === state.selected.id)
    if(isUndefined(selected)) {
        dispatch(actions.setSelected(state.catalogs[0].id))
    }

    const changeSelected = (id: number) => {
        dispatch(actions.setSelected(id));
    }

    return <SimpleSelect toOption={toOption}
                         options={state.catalogs}
                         className={"selector"}
                         onChange={newValue => changeSelected(newValue)}
                         value={state.selected}
    />
}