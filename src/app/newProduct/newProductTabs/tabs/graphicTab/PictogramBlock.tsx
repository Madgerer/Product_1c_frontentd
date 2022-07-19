import './PictogramBlock.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../../redux/reducers";
import {actions, GraphicTabState} from "../../../../../redux/reducers/local/newProduct/graphicTabComponent";
import {NewProductState} from "../../../../../redux/reducers/local/newProduct";
import {LanguageState} from "../../../../../redux/reducers/languages";
import {useEffect} from "react";
import {
    addPictogramToGroupThunk, changeGroupPictogramThunk,
    getAllPictogramsThunk,
    getGroupPictogramsThunk, removePictogramFromGroupThunk
} from "../../../../../redux/reducers/local/newProduct/graphicTabComponent/thunks";
import NullableSelect from "../../../../common/NullableSelect";
import ToOptionProvider from "../../../../../utils/ToOptionProvider";
import _ from "lodash";
import {Table} from "react-bootstrap";

export default function PictogramBlock() {
    const staticServer = process.env.REACT_APP_STATIC_SERVER_API
    const local = useSelector<AppState, GraphicTabState>(x => x.local.newProductState.graphicTabState)
    const productGroupState = useSelector<AppState, NewProductState>(x => x.local.newProductState.common)
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState)
    const dispatch = useDispatch();

    useEffect(() => {
        if(languageState.selected.id === 0)
            return
        dispatch(getAllPictogramsThunk({
            languageId: languageState.selected.id
        }))
        dispatch(getGroupPictogramsThunk({
            productGroupId: productGroupState.productGroup.id,
            languageId: languageState.selected.id
        }))
    },[languageState.selected.id])

    const addPictogram = () => {
        if(local.selectedPictogram === null) {
            alert('Выберите пиктограмму для добавления')
            return
        }
        if(local.groupPictograms.findIndex(x => x.id === local.selectedPictogram!.id) > -1){
            alert('Пиктограмма уже добавлена')
            return;
        }
        dispatch(addPictogramToGroupThunk({
            productGroupId: productGroupState.productGroup.id,
            pictogramId: local.selectedPictogram?.id
        }))
    }

    const removePictogram = () => {
        if(local.selectedGroupPictogram === null){
            alert('Выберите пиктограмму для удаления')
            return
        }
        dispatch(removePictogramFromGroupThunk({
            pictogramId: local.selectedGroupPictogram.id,
            productGroupId: productGroupState.productGroup.id
        }))
    }

    const changePictogram = () => {
        if(local.selectedGroupPictogram === null){
            alert('Выберите пиктограмму для изменения')
            return
        }

        if(local.selectedPictogram === null) {
            alert('Выберите пиктограмму из списка')
            return
        }

        dispatch(changeGroupPictogramThunk({
            pictogramId: local.selectedGroupPictogram.id,
            newPictogramId: local.selectedPictogram.id,
            productGroupId: productGroupState.productGroup.id
        }))
    }

    const setSelectedPictogram = (id: number) => dispatch(actions.setSelectedPictogram(id))
    const setSelectedGroupPictogram = (id: number) => dispatch(actions.setSelectedGroupPictogram(id))

    return <div className="">
        <div className="item col-md-12" style={{marginTop: 15}}>
            <div>
                <button type="button" className="btn btn-dark" onClick={() => addPictogram()}>
                    <i className="fa  fa-plus" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark" onClick={() => changePictogram()}>
                    <i className="fa  fa-pencil-square-o" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark" onClick={() => removePictogram()}>
                    <i className="fa  fa-minus" aria-hidden="true"></i>
                </button>
                <NullableSelect value={local.selectedPictogram}
                                className={"selector"}
                                placeholder={"Выберите пиктограмму"}
                                toOption={ToOptionProvider.pictogramToOption}
                                options={_.orderBy(local.pictograms, x => x.sort)}
                                onChange={e => setSelectedPictogram(e as number)}/>
                <input className="form-control" type="text" disabled
                       value={local.selectedGroupPictogram?.name ?? ""}
                       placeholder="Пиктограмма для удаления"
                       style={{width:400, textAlign: "center"}}/>
            </div>
            <>
                <Table>
                    <tbody>
                        <tr>
                            {_.orderBy(local.groupPictograms, x => x.sort).map(x =>  {
                                return <td onClick={() => setSelectedGroupPictogram(x.id)}>
                                    <img src={`${staticServer}/${x.imageUrl}`} alt={x.name}/>
                                </td>
                            })
                            }
                        </tr>
                    </tbody>
                </Table>

            </>
        </div>
    </div>
}