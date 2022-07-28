import './Recommendations.scss'
import {useSearchParams} from "react-router-dom";
import TextButton from "../common/basic/buttons/TextButton";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actions, RecommendationsState} from "../../redux/reducers/local/recommendationsComponent";
import {
    addRecommendationsThunk,
    getAllPictogramsThunk, getAllRecommendationThunk,
    getOrReserveThunk
} from "../../redux/reducers/local/recommendationsComponent/thunks";
import {AppState} from "../../redux/reducers";
import {LanguageState} from "../../redux/reducers/languages";

export default function Recommendations() {
    const [searchParams] = useSearchParams();
    const paramGroupId = searchParams.get('productGroupId');
    const dispatch = useDispatch();
    const local = useSelector<AppState, RecommendationsState>(x => x.local.recommendationState)
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState)

    useEffect(() => {
        if(paramGroupId !== null && languageState.selected.id !== 0)
        {
            dispatch(getOrReserveThunk({
                productGroupId: paramGroupId,
                languageId: languageState.selected.id
            }))
        }
    }, [languageState.selected.id])

    useEffect(() => {
        dispatch(getAllPictogramsThunk({languageId: languageState.selected.id}))
    }, [languageState.selected.id])

    useEffect(() => {
        if(local.productGroup != null) {
            dispatch(getAllRecommendationThunk({
                productGroupId: local.productGroup.id,
                languageId: languageState.selected.id,
                priceGroupId: local.productGroup.priceGroupId!,
                search: ""
            }))
        }
    }, [local.productGroup])

    return <>
        {
            paramGroupId === null
                ? <>Переданы неверные аргументы</>
                : <>
                    <TextButton text={"Добавить"} onClick={() => {}}/>

                </>
        }
    </>
}