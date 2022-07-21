import SimpleSelect, {IOptionType} from "../basic/selectors/SimpleSelect";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {useEffect} from "react";
import {actions, SellmarkState} from "../../../redux/reducers/sellmarks";
import {getSellmarksThunk} from "../../../redux/reducers/sellmarks/thunk";
import {isUndefined} from "lodash";
import {ISellmark} from "../../../domain/types";

const toOption = (sellmark: ISellmark): IOptionType => {
    return {
        value: sellmark.id,
        label: sellmark.name
    }
}

function SellmarkSelector() {

    const state = useSelector<AppState, SellmarkState>(s => s.sellmarkState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSellmarksThunk())
    }, []);

    const selected = state.sellmarks.find(x => x.id === state.selected.id)
    if(isUndefined(selected)) {
        dispatch(actions.setSelected(state.sellmarks[0].id))
    }

    const changeSelected = (id: number) => {
        dispatch(actions.setSelected(id));
    }

    return <SimpleSelect toOption={toOption}
        options={state.sellmarks}
        className={"selector"}
        onChange={newValue => changeSelected(newValue)}
        value={state.selected}
    />
}

export default SellmarkSelector