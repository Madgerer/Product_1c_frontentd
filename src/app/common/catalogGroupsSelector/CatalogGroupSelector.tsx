import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {isUndefined} from "lodash";
import SimpleSelect, {IOptionType} from "../SimpleSelect";
import {ICatalogGroup} from "../../../domain/types";
import {actions, CatalogGroupsState} from "../../../redux/reducers/catalogGroups";

const toOption = (catalog: ICatalogGroup): IOptionType => {
    return {
        value: catalog.id,
        label: catalog.name
    }
}

function CatalogGroupSelector() {

    const state = useSelector<AppState, CatalogGroupsState>(s => s.catalogGroupState);
    const dispatch = useDispatch();

    const selected = state.groups.find(x => x.id === state.selected.id)
    if(isUndefined(selected)) {
        dispatch(actions.setSelected(state.groups[0].id))
    }

    const changeSelected = (id: number) => {
        dispatch(actions.setSelected(id));
    }

    return <SimpleSelect toOption={toOption}
                         options={state.groups}
                         className={"selector"}
                         onChange={newValue => changeSelected(newValue)}
                         value={state.selected}
    />
}

export default CatalogGroupSelector