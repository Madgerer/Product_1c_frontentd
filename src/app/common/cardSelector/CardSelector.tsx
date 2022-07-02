import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {isUndefined} from "lodash";
import SimpleSelect from "../SimpleSelect";
import {actions, CardTypesState} from "../../../redux/reducers/cardTypes";

function CardTypeSelector() {

    const state = useSelector<AppState, CardTypesState>(s => s.cardTypesState);
    const dispatch = useDispatch();

    const selected = state.cardTypes.find(x => x.value === state.selected.value)
    if(isUndefined(selected)) {
        dispatch(actions.setSelected(state.cardTypes[0].value))
    }

    const changeSelected = (id: number) => {
        dispatch(actions.setSelected(id));
    }

    return <SimpleSelect toOption={x => x}
            options={state.cardTypes}
            className={"selector"}
            onChange={newValue => changeSelected(newValue)}
            value={state.selected}
        />
}

export default CardTypeSelector