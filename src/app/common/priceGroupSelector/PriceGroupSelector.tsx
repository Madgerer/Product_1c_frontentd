import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {actions, PriceGroupState} from "../../../redux/reducers/priceGroups";
import {getPriceGroupsThunk} from "../../../redux/reducers/priceGroups/thunk";
import {isUndefined} from "lodash";
import SimpleSelect, {IOptionType} from "../SimpleSelect";
import {IPriceGroup} from "../../../domain/types";

const toOption = (priceGroup: IPriceGroup): IOptionType =>  {
    return {value: priceGroup.id, label: priceGroup.name};
}

function PriceGroupSelector() {
    const state = useSelector<AppState, PriceGroupState>(s => s.priceGroupsState);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPriceGroupsThunk())
    }, []);

    const selected = state.priceGroups.find(x => x.id === state.selected.id)
    if(isUndefined(selected)) {
        dispatch(actions.setSelected(state.priceGroups[0].id))
    }

    const changeSelected = (id: number) => {
        dispatch(actions.setSelected(id));
    }

    return <SimpleSelect toOption={toOption}
                         options={state.priceGroups}
                         className={"selector"}
                         onChange={newValue => changeSelected(newValue)}
                         value={state.selected}
    />
}

export default PriceGroupSelector;