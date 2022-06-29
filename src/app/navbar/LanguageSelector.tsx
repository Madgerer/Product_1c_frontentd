import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux/reducers";
import {LanguageState} from "../../redux/reducers/languages";
import {actions} from "../../redux/reducers/languages";
import {useEffect} from "react";
import {uploadLanguagesThunk} from "../../redux/reducers/languages/thunk";
import {isUndefined} from "lodash";

function LanguageSelector() {
    const state = useSelector<AppState, LanguageState>(s => s.languageState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(uploadLanguagesThunk())
    }, []);


    const selected = state.languages.find(x => x.id === state.selectedLanguage.id)
    if(isUndefined(selected)) {
        dispatch(actions.setSelected(state.languages[0].id))
    }

    const changeSelected = (i: string) => {
        const id = Number(i);
        dispatch(actions.setSelected(id));
    }

    return <div className="form-group input-group-sm navbar-select-container">
        <select className="form-control navbar-select" id="langSelect" value={state.selectedLanguage.id} onChange={e => changeSelected(e.currentTarget.value)}>
            {state.languages.map((lang, i) => <option value={lang.id} key={lang.id}>{lang.name}</option>)}
        </select>
    </div>
}

export default LanguageSelector