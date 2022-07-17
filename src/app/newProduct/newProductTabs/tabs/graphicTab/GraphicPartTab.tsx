import NullableSelect from "../../../../common/NullableSelect";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../../redux/reducers";
import {actions, GraphicTabState} from "../../../../../redux/reducers/local/newProduct/graphicTabComponent";
import ToOptionProvider from "../../../../../utils/ToOptionProvider";
import {
    getImageTypesThunk, getProductImagesThunk,
    removeImageThunk, updateImageThunk,
    uploadImageThunk
} from "../../../../../redux/reducers/local/newProduct/graphicTabComponent/thunks";
import {NewProductState} from "../../../../../redux/reducers/local/newProduct";
import VideoModal from "./VideoModal";
import {useEffect} from "react";
import {Table} from "react-bootstrap";
import Constants from "../../../../../domain/Constants";
import YoutubePlayer from "./YoutubePlayer";

export default function GraphicPartTab(){
    const staticServer = process.env.REACT_APP_STATIC_SERVER_API
    const local = useSelector<AppState, GraphicTabState>(x => x.local.newProductState.graphicTabState)
    const productGroupState = useSelector<AppState, NewProductState>(x => x.local.newProductState.common)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getImageTypesThunk())
        dispatch(getProductImagesThunk({
            productGroupId: productGroupState.productGroup.id
        }))
    },[])

    const setFile = (event) => dispatch(actions.setFile(event.target.files[0]))
    const setSelectedImageType = (id: number | null) => dispatch(actions.setSelectedImageType(id))
    const openModel = () => dispatch(actions.setShouldOpenModal())

    const addImage = () => {
        if(local.newImage === null){
            alert('Выберите файл для добавления')
            return
        }
        if(local.selectedImageType === null) {
            alert('Выберите тип изображения')
            return;
        }

        if(local.groupImages.findIndex(x => x.typeId === local.selectedImageType!.id) !== -1) {
            alert('Изображение уже добавлено')
            return;
        }

        dispatch(uploadImageThunk({
            image: local.newImage,
            imageType: local.selectedImageType.id,
            productGroupId: productGroupState.productGroup.id
        }))
    }

    const removeImage = () => {
        if(local.selectedGroupImage === null){
            alert('Выберите изображение для удаления')
            return
        }
        dispatch(removeImageThunk({
            productGroupId: productGroupState.productGroup.id,
            imageType: local.selectedGroupImage.typeId
        }))
    }

    const changeImage = () => {
        if(local.newImage === null){
            alert('Выберите файл для изменения')
            return
        }
        if(local.selectedGroupImage === null) {
            alert('Выберите изображение для изменения')
            return
        }
        dispatch(updateImageThunk({
            imageType: local.selectedGroupImage.typeId,
            image: local.newImage,
            productGroupId: productGroupState.productGroup.id
        }))
    }

    return <div className="">
        <div className="item col-md-12" style={{marginTop: 15}}>
            <button type="button" className="btn btn-dark" onClick={() => addImage()}>
                <i className="fa  fa-plus" aria-hidden="true"></i>
            </button>
            <button type="button" className="btn btn-dark" onClick={() => removeImage()}>
                <i className="fa  fa-minus" aria-hidden="true"></i>
            </button>
            <NullableSelect value={local.selectedImageType}
                            options={local.imageTypes}
                            onChange={id => setSelectedImageType(id as number)}
                            toOption={ToOptionProvider.imageTypeToOption}
                            className={"selector"}
                            placeholder={"Выберите тип"}/>
            <input className="form-control" type="text" placeholder="Тип для удаления" disabled value={local.selectedGroupImage != null
                ? local.imageTypes.find(x => x.id === local.selectedImageType!.id)!.name
                : ""
            }/>
            <button type="button" className="btn btn-dark" onClick={() => changeImage()}>
                <i className="fa fa-file-image-o" aria-hidden="true"></i>
            </button>
            <input type="file" onChange={setFile} />
            <button type="button" className="btn btn-dark" onClick={() => openModel()}>
                Добавить видео
            </button>
            <button type="button" className="btn btn-dark" disabled={true}>
                Обновить на сайте
            </button>
        </div>
        <Table>
            <thead>
                <tr>
                    {local.groupImages.map(x => {
                        const type = local.imageTypes.find(it => it.id === x.typeId)
                        return <th>{type!.name}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {
                        local.groupImages.map(x => {
                            return <td>
                                {
                                    x.typeId === Constants.YoutubeImageType
                                        ? <YoutubePlayer url={x.imageUrl}/>
                                        : <img src={`${staticServer}/${x.imageUrl}`} alt={x.typeId.toString()}/>
                                }
                            </td>
                        })
                    }
                </tr>
            </tbody>
        </Table>
        <div className="item col-md-12" style={{marginTop: 15}}>
            <div>
                <button type="button" className="btn btn-dark">
                    <i className="fa  fa-plus" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark">
                    <i className="fa  fa-pencil-square-o" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark">
                    <i className="fa  fa-minus" aria-hidden="true"></i>
                </button>
                <div>Селектор пиктограм</div>
                <input className="form-control" type="text" disabled id="pictName" placeholder="Пиктограмма для удаления"
                       style={{width:400, textAlign: "center"}}/>
            </div>
            <div>
                Какая-то таблица
            </div>
        </div>
        <VideoModal></VideoModal>
    </div>
}