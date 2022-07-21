import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {actions, LanguageState} from "../../../redux/reducers/languages";
import {useEffect} from "react";
import {getLanguagesThunk} from "../../../redux/reducers/languages/thunk";
import "./languageSelector.scss"
import SimpleSelect, {IOptionType} from "../basic/selectors/SimpleSelect";
import {ILanguage} from "../../../domain/types";

const toOption = (lang: ILanguage): IOptionType =>  {
    return {value: lang.id, label: lang.name};
}

function LanguageSelector() {
    const state = useSelector<AppState, LanguageState>(s => s.languageState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLanguagesThunk())
    }, []);


    const changeSelected = (id: number) => {
        if(state.selected.id === id)
            return;
        dispatch(actions.setSelected(id));
    }

    return <div className="form-group input-group-sm navbar-select-container">
        <SimpleSelect toOption={toOption}
            options={state.languages}
            className={"selector"}
            onChange={newValue => changeSelected(newValue)}
            value={state.selected}
        />
    </div>
}

export default LanguageSelector