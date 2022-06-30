import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux/reducers";
import {PriceGroupState} from "../../redux/reducers/priceGroups";
import {uploadPriceGroups} from "../../redux/reducers/priceGroups/thunk";
import {actions} from "../../redux/reducers/priceGroups";
import {isUndefined} from "lodash";
import {IPriceGroup} from "../../redux/reducers/priceGroups/types";
import SimpleSelect, {IOptionType} from "../Common/SimpleSelect";

const toOption = (priceGroup: IPriceGroup): IOptionType =>  {
    return {value: priceGroup.id, label: priceGroup.name};
}

function PriceGroupSelector() {
    const state = useSelector<AppState, PriceGroupState>(s => s.priceGroupsState);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(uploadPriceGroups())
    }, []);

    const selected = state.priceGroups.find(x => x.id === state.selected.id)
    if(isUndefined(selected)) {
        dispatch(actions.setSelected(state.priceGroups[0].id))
    }

    const changeSelected = (id: number) => {
        dispatch(actions.setSelected(id));
    }

    return <div>
            <SimpleSelect toOption={toOption}
                          options={state.priceGroups}
                          className={"selector"}
                          onChange={newValue => changeSelected(newValue)}
                          value={state.selected}
            />
    </div>
}

export default PriceGroupSelector;