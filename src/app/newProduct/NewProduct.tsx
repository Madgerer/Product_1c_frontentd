import NewProductToolbar from "./newProductToolbar/NewProductToolbar";
import NewProductTabs from "./newProductTabs/NewProductTabs";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux/reducers";
import {LanguageState} from "../../redux/reducers/languages";
import {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {
    getOrReserveThunk
} from "../../redux/reducers/local/newProduct/thunks";
import {useLocation} from "react-router";
import {NewProductState} from "../../redux/reducers/local/newProduct";
import {Spinner} from "react-bootstrap";

export default function NewProduct() {
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState);
    const local = useSelector<AppState, NewProductState>(x => x.local.newProductState.common);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const paramGroupId = searchParams.get('productGroupId');
    const navigate = useNavigate();
    const location = useLocation();

    if((paramGroupId == null && local.productGroup.id != "")
        || (paramGroupId != null && local.productGroup.id != "" && (paramGroupId != local.productGroup.id))) {
        navigate(location.pathname+`?productGroupId=${local.productGroup.id}`, {replace:true} /*''*/)
    }

    useEffect(() => {
        if(languageState.selected.id == 0)
            return;
        dispatch(getOrReserveThunk({productGroupId: paramGroupId, languageId: languageState.selected.id}))
    },[languageState.selected.id, local.productGroup.wasCreate])

    return <div>
        {
            local.loadingState.isPageLoading
                ? <Spinner animation={'border'} />
                : <>
                    <NewProductToolbar/>
                    {
                        local.productGroup.wasCreate
                            ? <NewProductTabs/>
                            : <></>
                    }
                </>
        }
    </div>
}