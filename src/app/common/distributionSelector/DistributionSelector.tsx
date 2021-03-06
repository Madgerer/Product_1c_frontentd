import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {isUndefined} from "lodash";
import SimpleSelect from "../SimpleSelect";
import {actions, DistributionTypeState} from "../../../redux/reducers/distributionsTypes";

function DistributionTypeSelector() {

    const state = useSelector<AppState, DistributionTypeState>(s => s.distributionTypesState);
    const dispatch = useDispatch();

    const selected = state.distributedTypes.find(x => x.value === state.selected.value)
    if(isUndefined(selected)) {
        dispatch(actions.setSelected(state.distributedTypes[0].value))
    }

    const changeSelected = (id: number) => {
        dispatch(actions.setSelected(id));
    }

    return <SimpleSelect toOption={x => x}
            options={state.distributedTypes}
            className={"selector"}
            onChange={newValue => changeSelected(newValue)}
            value={state.selected}
        />
}

export default DistributionTypeSelector