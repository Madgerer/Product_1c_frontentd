import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {useEffect} from "react";
import {isUndefined} from "lodash";
import SimpleSelect from "../SimpleSelect";
import {actions, WebSitesState} from "../../../redux/reducers/webSites";
import ToOptionProvider from "../../../utils/ToOptionProvider";
import {getWebsitesThunk} from "../../../redux/reducers/webSites/thunks";

export default function WebsiteSelector() {

    const state = useSelector<AppState, WebSitesState>(s => s.websitesState);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getWebsitesThunk())
    }, []);

    const selected = state.websites.find(x => x.id === state.selected.id)
    if(isUndefined(selected)) {
        dispatch(actions.setSelected(state.websites[0].id))
    }

    const changeSelected = (id: number) => {
        dispatch(actions.setSelected(id));
    }

    return <SimpleSelect toOption={ToOptionProvider.websiteToOption}
                         options={state.websites}
                         className={"selector"}
                         onChange={newValue => changeSelected(newValue)}
                         value={state.selected}
    />
}
