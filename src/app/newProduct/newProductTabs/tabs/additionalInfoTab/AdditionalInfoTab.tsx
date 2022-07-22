import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../../redux/reducers";
import {actions, AdditionalInfoState} from "../../../../../redux/reducers/local/newProduct/additionalInfoComponent";
import FaButton from "../../../../common/basic/buttons/FaButton";
import ToOptionProvider from "../../../../../utils/ToOptionProvider";
import {useEffect} from "react";
import {LanguageState} from "../../../../../redux/reducers/languages";
import {
    addRecommendationThunk,
    getAllRecommendationThunk,
    getGroupRecommendationThunk, removeRecommendationThunk, swapRecommendationSortThunk
} from "../../../../../redux/reducers/local/newProduct/additionalInfoComponent/thunks";
import {NewProductState} from "../../../../../redux/reducers/local/newProduct";
import _ from "lodash";
import {Table} from "react-bootstrap";
import FastNullableSelector from "../../../../common/basic/selectors/FastNullableSelector";
import TextButton from "../../../../common/basic/buttons/TextButton";
import {IMountableProps} from "../../../../../redux/types";

export default function AdditionalInfoTab(props: IMountableProps) {
    const local = useSelector<AppState, AdditionalInfoState>(x => x.local.newProductState.additionalInfoState)
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState)
    const groupState = useSelector<AppState, NewProductState>(x => x.local.newProductState.common)
    const dispatch = useDispatch()

    useEffect(() => {
        props.onMount()
    }, [])

    useEffect(() => {
        dispatch(getAllRecommendationThunk({
            priceGroupId: groupState.productGroup.priceGroupId!,
            search: '',
            languageId: languageState.selected.id
        }))
        dispatch(getGroupRecommendationThunk({
            languageId: languageState.selected.id,
            productGroupId: groupState.productGroup.id
        }))
    }, [languageState.selected.id, groupState.selectedPriceGroup?.id])

    const setSelectedRec = (id: string) => dispatch(actions.setSelectedRec(id))
    const setSelectedGroupRed = (id: string) => dispatch(actions.setSelectedGroupRec(id))

    const addRec = () => {
        if(local.selectedRecommendation === null){
            alert('Выберите продукт')
            return
        }

        if(local.groupRecommendations.findIndex(x => x.id === local.selectedRecommendation!.id) !== -1) {
            alert('Продукт уже добавлен в рекомендации')
            return;
        }

        dispatch(addRecommendationThunk({
            productGroupId: groupState.productGroup.id,
            productId: local.selectedRecommendation.id!
        }))
    }

    const removeRec = () => {
        if(local.selectedGroupRecommendation === null) {
            alert('Выберите рекомендацию для удаления')
            return
        }

        const recToRemove = local.groupRecommendations.find(x => x.id === local.selectedGroupRecommendation!.id)
        if(recToRemove === undefined) {
            alert('Ошибка состояния, перезагрузите страницу')
            return;
        }

        dispatch(removeRecommendationThunk({
           productId: local.selectedGroupRecommendation.id,
           productGroupId: groupState.productGroup.id
        }))
    }

    const swapSort = (addition: number) => {
        const current = local.selectedGroupRecommendation;
        if(current === null) {
            alert('Выберите рекомендацию')
            return
        }
        const sort = current.sort!;
        const targetSort = sort + addition;
        const target = local.groupRecommendations.find(x => x.sort === targetSort)
        if(target === undefined){
            alert("Новое значение сортировки выходит за границы доступного")
            return;
        }

        dispatch(swapRecommendationSortThunk({
            productGroupId: groupState.productGroup.id,
            firstProductId: current.id,
            secondProductId: target.id
        }))
    }

    return <div className="tab-pane">
        <div>
            <div className="u-buttons-wrapper">
                <FaButton onClick={() => addRec()} faType="fa-plus"/>
                <FaButton onClick={() => removeRec()} faType="fa-minus"/>
                <FastNullableSelector value={local.selectedRecommendation}
                                      options={local.allRecommendations}
                                      onChange={(id) => {setSelectedRec(id as string)}}
                                      toOption={ToOptionProvider.productIdentityToOption}
                                      className={"selector"}
                                      placeholder={"Наименование товара"}
                                      noOptionsMessage={'Нет подходящих товаров'}/>
                <FaButton onClick={() => swapSort(-1)} faType={"fa-arrow-up"}/>
                <FaButton onClick={() => swapSort(1)} faType={"fa-arrow-down"}/>
                {/*<AsyncDebounceSelect isLoading={local.isRecommendationsLoading}
                                     toOption={ToOptionProvider.productIdentityToOption}
                                     debounceTime={300}
                                     onSearch={onSearch}
                                     options={local.allRecommendations}
                                     className={"selector"}
                                     value={local.selectedRecommendation}
                                     onChange={(id) => setSelectedRec(id as string)}
                                     placeholder={"Выберите наименование"}/>*/}

                <TextButton text={"Добавить"}/>
                <TextButton text={"Обновить"}/>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Код</th>
                        <th>Наименование</th>
                        <th>№</th>
                    </tr>
                </thead>
                <tbody>
                {
                    local.groupRecommendations.length === 0
                        ? <tr>
                                <td colSpan={3}>No matching records found</td>
                            </tr>
                        : _.orderBy(local.groupRecommendations, x => x.sort)!.map(x => {
                            return <tr id={x.id} onClick={() => setSelectedGroupRed(x.id)} className={x.selected ? "--selected" : ""}>
                                <td>{x.id}</td>
                                <td>{x.name}</td>
                                <td>{x.sort}</td>
                            </tr>
                        })
                }
                </tbody>
            </Table>
        </div>
        {/*<div>
            <div>
                <button type="button" className="btn btn-dark">
                    <i className="fa  fa-plus" aria-hidden="true"></i>
                </button>
                <input className="form-control" type="text"/>
                <label className="form-check-label">
                    № на стр.
                </label>
                <input className="form-control" type="text"/>
                <button type="button" className="btn btn-dark">
                    Показывать не показывать
                </button>
                <div>
                    Селектор сайтов
                </div>
                <button type="button" className="btn btn-dark">
                    Добавить на сайт
                </button>
            </div>
            <div>Какая-то таблица</div>
        </div>*/}
    </div>
}