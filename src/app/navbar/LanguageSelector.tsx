import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux/reducers";
import {LanguageState} from "../../redux/reducers/languages";
import {actions} from "../../redux/reducers/languages";
import {useEffect, useState} from "react";
import {uploadLanguagesThunk} from "../../redux/reducers/languages/thunk";
import {ILanguage} from "../../redux/reducers/languages/types";
import "./languageSelector.scss"
import SimpleSelect, {IOptionType} from "../Common/SimpleSelect";

const toOption = (lang: ILanguage): IOptionType =>  {
    return {value: lang.id, label: lang.name};
}

function LanguageSelector() {
    const state = useSelector<AppState, LanguageState>(s => s.languageState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(uploadLanguagesThunk())
    }, []);


    const changeSelected = (id: number) => {
        if(state.selectedLanguage.id === id)
            return;
        dispatch(actions.setSelected(id));
    }

    return <div className="form-group input-group-sm navbar-select-container">
        <SimpleSelect toOption={toOption}
            options={state.languages}
            className={"selector"}
            onChange={newValue => changeSelected(newValue)}
            value={state.selectedLanguage}
        />
    </div>
}

export default LanguageSelector