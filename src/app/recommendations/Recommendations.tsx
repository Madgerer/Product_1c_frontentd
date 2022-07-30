import './Recommendations.scss'
import {useSearchParams} from "react-router-dom";
import TextButton from "../common/basic/buttons/TextButton";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actions, Recommendation, RecommendationsState} from "../../redux/reducers/local/recommendationsComponent";
import {
    addRecommendationsThunk,
    getAllPictogramsThunk, getAllRecommendationThunk,
    getOrReserveThunk
} from "../../redux/reducers/local/recommendationsComponent/thunks";
import {AppState} from "../../redux/reducers";
import {LanguageState} from "../../redux/reducers/languages";
import ToOptionProvider from "../../utils/ToOptionProvider";
import NullableSelect from "../common/basic/selectors/NullableSelect";
import {Table} from "react-bootstrap";
import {useDebouncedCallback} from "use-debounce";

export default function Recommendations() {
    const [searchParams] = useSearchParams();
    const paramGroupId = searchParams.get('productGroupId');
    const dispatch = useDispatch();
    const local = useSelector<AppState, RecommendationsState>(x => x.local.recommendationComponent)
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

    const addRecommendations = () => {
        const productsToAdd = local.recommendations.filter(x => x.selected)
        if(productsToAdd.length === 0)
        {
            alert('Выберите продукты для добавления')
            return
        }
        dispatch(addRecommendationsThunk({
            productGroupId: paramGroupId!,
            productsIds: productsToAdd.map(x => x.id)
        }))
    }

    const setSelectedPictogram = (id: number | null) => {
        dispatch(actions.setSelectedPictogram(id))
    }

    const setSelectedProduct = (recommendation: Recommendation) => {
        dispatch(actions.setSelectedRecommendation(recommendation.id))
    }

    const setSearchString = (search: string) => dispatch(actions.setSearch(search))
    const debouncedSetSearch = useDebouncedCallback(args => setSearchString(args), 500)

    return <>
        {
            paramGroupId === null
                ? <>Переданы неверные аргументы</>
                : <>
                    <TextButton text={"Добавить"} onClick={() => addRecommendations()}/>
                    <NullableSelect value={local.selectedPictogram}
                                  options={local.pictograms}
                                  onChange={value => setSelectedPictogram(value as number)}
                                  placeholder="Выберите группу пиктограм"
                                  className="selector"
                                  toOption={ToOptionProvider.pictogramToOption}
                    />
                    <input value={local.searchString} onChange={e => setSearchString(e.currentTarget.value)}/>
                    <Table>
                        <thead>
                            <tr>
                                <th>Код</th>
                                <th>Наименование</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            local.recommendations.filter(x => x.name.includes(local.searchString)).map(x => {
                                return <tr onClick={() => debouncedSetSearch(x)} className={x.selected ? "--selected" : ""}>
                                    <td>{x.id}</td>
                                    <td>{x.name}</td>
                                    <td><input type={"checkbox"} checked={x.selected} readOnly={true}/></td>
                                </tr>
                            })
                        }
                        </tbody>
                    </Table>
                </>
        }
    </>
}