import './RecommendationBlock.scss'
import FaButton from "../../../../common/basic/buttons/FaButton";
import FastNullableSelector from "../../../../common/basic/selectors/FastNullableSelector";
import ToOptionProvider from "../../../../../utils/ToOptionProvider";
import {Table} from "react-bootstrap";
import _ from "lodash";
import {useEffect} from "react";
import {
    addRecommendationsThunk,
    getAllRecommendationThunk,
    getGroupRecommendationThunk, removeRecommendationThunk, swapRecommendationSortThunk
} from "../../../../../redux/reducers/local/newProduct/additionalInfoComponent/thunks";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../../redux/reducers";
import {actions, AdditionalInfoState} from "../../../../../redux/reducers/local/newProduct/additionalInfoComponent";
import {LanguageState} from "../../../../../redux/reducers/languages";
import {NewProductState} from "../../../../../redux/reducers/local/newProduct";
import TextButton from "../../../../common/basic/buttons/TextButton";
import {Link} from "react-router-dom";

export default function RecommendationBlock() {

    const local = useSelector<AppState, AdditionalInfoState>(x => x.local.newProductComponent.additionalInfoState)
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState)
    const groupState = useSelector<AppState, NewProductState>(x => x.local.newProductComponent.common)
    const dispatch = useDispatch()

    useEffect(() => {
        updateRecommendations()
    }, [languageState.selected.id, groupState.productGroup.priceGroupId])

    const setSelectedRec = (id: string) => dispatch(actions.setSelectedRec(id))
    const setSelectedGroupRed = (id: string) => dispatch(actions.setSelectedGroupRec(id))

    const updateRecommendations = () => {
        dispatch(getAllRecommendationThunk({
            productGroupId: groupState.productGroup.id,
            priceGroupId: groupState.productGroup.priceGroupId!,
            search: '',
            languageId: languageState.selected.id
        }))
        dispatch(getGroupRecommendationThunk({
            languageId: languageState.selected.id,
            productGroupId: groupState.productGroup.id
        }))
    }

    const addRec = () => {
        if(local.selectedRecommendation === null){
            alert('Выберите продукт')
            return
        }

        if(local.groupRecommendations.findIndex(x => x.productId === local.selectedRecommendation!.id) !== -1) {
            alert('Продукт уже добавлен в рекомендации')
            return;
        }

        dispatch(addRecommendationsThunk({
            productGroupId: groupState.productGroup.id,
            productsIds: [local.selectedRecommendation.id!]
        }))
    }

    const removeRec = () => {
        if(local.selectedGroupRecommendation === null) {
            alert('Выберите рекомендацию для удаления')
            return
        }

        const recToRemove = local.groupRecommendations.find(x => x.productId === local.selectedGroupRecommendation!.productId)
        if(recToRemove === undefined) {
            alert('Ошибка состояния, перезагрузите страницу')
            return;
        }

        dispatch(removeRecommendationThunk({
            productId: local.selectedGroupRecommendation.productId,
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
            firstProductId: current.productId,
            secondProductId: target.productId
        }))
    }

    return <div>
        <div className="u-buttons-wrapper">
            <FaButton onClick={() => addRec()} faType="fa-plus"/>
            <FaButton onClick={() => removeRec()} faType="fa-minus"/>
            <FastNullableSelector value={local.selectedRecommendation}
                                  options={local.allRecommendations}
                                  onChange={(id) => {setSelectedRec(id as string)}}
                                  toOption={ToOptionProvider.productIdentityToOption}
                                  className={"selector"}
                                  placeholder={"Наименование товара"}
                                  height={31}
                                  noOptionsMessage={'Нет подходящих товаров'}/>
            <FaButton onClick={() => swapSort(-1)} faType={"fa-arrow-up"}/>
            <FaButton onClick={() => swapSort(1)} faType={"fa-arrow-down"}/>
            <button className="btn btn-dark" value={"Добавить"}>
                <span><Link to={`/recommendations?productGroupId=${groupState.productGroup.id}`} target="_blank">Добавить</Link></span>
            </button>
            <TextButton text={"Обновить"} onClick={() => updateRecommendations()}/>
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
                        return <tr id={x.productId} onClick={() => setSelectedGroupRed(x.productId)} className={x.selected ? "--selected" : ""}>
                            <td>{x.productId}</td>
                            <td>{x.name}</td>
                            <td>{x.sort}</td>
                        </tr>
                    })
            }
            </tbody>
        </Table>
    </div>
}