import SimpleSelect, {IOptionType} from "../common/SimpleSelect";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux/reducers";
import {useEffect} from "react";
import {actions} from "../../redux/reducers/priceGroups";
import {SellmarkState} from "../../redux/reducers/sellmarks";
import {uploadSellmarks} from "../../redux/reducers/sellmarks/thunk";
import {isUndefined} from "lodash";
import {ISellmark} from "../../domain/types";

const toOption = (catalog: ISellmark): IOptionType => {
    return {
        value: catalog.id,
        label: catalog.name
    }
}

function SellmarkSelector() {

    const state = useSelector<AppState, SellmarkState>(s => s.sellmarkState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(uploadSellmarks())
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