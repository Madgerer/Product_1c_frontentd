import './ImageBlock.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../../redux/reducers";
import {actions, GraphicTabState} from "../../../../../redux/reducers/local/newProduct/graphicTabComponent";
import {NewProductState} from "../../../../../redux/reducers/local/newProduct";
import {useEffect, useState} from "react";
import {
    getImageTypesThunk,
    getProductImagesThunk, removeImageThunk, updateImageThunk, uploadImageThunk
} from "../../../../../redux/reducers/local/newProduct/graphicTabComponent/thunks";
import {IImage} from "../../../../../domain/types";
import NullableSelect from "../../../../common/basic/selectors/NullableSelect";
import ToOptionProvider from "../../../../../utils/ToOptionProvider";
import {Table} from "react-bootstrap";
import _ from "lodash";
import Constants from "../../../../../domain/Constants";
import YoutubePlayer from "./YoutubePlayer";
import VideoModal from "./VideoModal";

export default function ImageBlock() {
    const staticServer = process.env.REACT_APP_STATIC_SERVER_API
    const local = useSelector<AppState, GraphicTabState>(x => x.local.newProductState.graphicTabState)
    const productGroupState = useSelector<AppState, NewProductState>(x => x.local.newProductState.common)
    const dispatch = useDispatch();
    const [file, setFile] = useState<File | null>()

    useEffect(() => {
        dispatch(getImageTypesThunk())
        dispatch(getProductImagesThunk({
            productGroupId: productGroupState.productGroup.id
        }))
    },[])

    const setSelectedImageType = (id: number | null) => dispatch(actions.setSelectedImageType(id))
    const openModel = () => dispatch(actions.setShouldOpenModal())
    const setSelectedGroupType = (image: IImage) => dispatch(actions.setSelectedGroupImage(image))
    const setFileFromEvent = (event) => {
        setFile(event.target.files[0])
    }

    const addImage = () => {
        if(file === undefined){
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
            image: file!,
            imageType: local.selectedImageType.id,
            productGroupId: productGroupState.productGroup.id
        }))
    }

    const removeImage = () => {
        if(local.selectedGroupType === null){
            alert('Выберите изображение для удаления')
            return
        }
        dispatch(removeImageThunk({
            productGroupId: productGroupState.productGroup.id,
            imageType: local.selectedGroupType.id
        }))
    }

    const changeImage = () => {
        if(file === null || file === undefined){
            alert('Выберите файл для изменения')
            return
        }
        if(local.selectedGroupType === null) {
            alert('Выберите изображение для изменения')
            return
        }
        dispatch(updateImageThunk({
            imageType: local.selectedGroupType!.id,
            image: file!,
            productGroupId: productGroupState.productGroup.id
        }))
    }

    return <>
        <div className="image-block--first-row" >
            <button type="button" className="btn btn-dark" onClick={() => addImage()}>
                <i className="fa  fa-plus" aria-hidden="true"/>
            </button>
            <button type="button" className="btn btn-dark" onClick={() => removeImage()}>
                <i className="fa  fa-minus" aria-hidden="true"/>
            </button>
            <NullableSelect value={local.selectedImageType}
                            options={local.imageTypes}
                            onChange={id => setSelectedImageType(id as number)}
                            toOption={ToOptionProvider.imageTypeToOption}
                            className={"selector selector-choose-type"}
                            placeholder={"Выберите тип"}/>
            <input className="form-control form-type-delete" type="text" placeholder="Тип для удаления" disabled value={local.selectedGroupType != null
                ? local.imageTypes.find(x => x.id === local.selectedGroupType!.id)!.name
                : ""
            }/>
            <button type="button" className="btn btn-dark" onClick={() => changeImage()}>
                <i className="fa fa-file-image-o" aria-hidden="true"/>
            </button>

            <input type="file" onChange={e => setFileFromEvent(e)} />

            <button type="button" className="btn btn-dark" onClick={() => openModel()}>
                Добавить видео
            </button>
            <button type="button" className="btn btn-dark" disabled={true}>
                Обновить на сайте
            </button>
        </div>
        <div className="image-block--tables-wrapper">
            {_.orderBy(local.groupImages, x => x.typeId).map(x => {
                const type = local.imageTypes.find(it => it.id === x.typeId)
                return <Table className="image-block--table">
                    <thead>
                    <tr>
                        <th onClick={() => setSelectedGroupType(x)}>{type!.name}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td onClick={() => setSelectedGroupType(x)} key={x.typeId}>
                            {
                                x.typeId === Constants.YoutubeImageType
                                  ? <YoutubePlayer url={x.imageUrl}/>
                                  : <img className="image-block--image" key={x.key} src={`${staticServer}/${x.imageUrl}`} alt={x.typeId.toString()}/>
                            }
                        </td>
                    </tr>
                    </tbody>
                </Table>
            })}
        </div>
        <VideoModal/>
    </>
}