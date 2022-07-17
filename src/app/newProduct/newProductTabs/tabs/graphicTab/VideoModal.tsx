import './VideoModal.scss'
import {Button, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../../redux/reducers";
import {actions, GraphicTabState} from "../../../../../redux/reducers/local/newProduct/graphicTabComponent";
import {NewProductState} from "../../../../../redux/reducers/local/newProduct";
import {uploadVideoThunk} from "../../../../../redux/reducers/local/newProduct/graphicTabComponent/thunks";

export default function VideoModal() {
    const local = useSelector<AppState, GraphicTabState>(x => x.local.newProductState.graphicTabState);
    const productGroupState = useSelector<AppState, NewProductState>(x => x.local.newProductState.common)
    const dispatch = useDispatch()

    const closeModal = () => dispatch(actions.setShouldOpenModal())
    const setLink = (link: string) => dispatch(actions.setVideoLink(link))

    const uploadVideo = () =>  {
        dispatch(uploadVideoThunk({
            videoUrl: local.videoLink,
            productGroupId: productGroupState.productGroup.id
        }))
    }

    return <Modal
        show={local.shouldOpenVideoModel}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Добавление видео
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>
                Ссылка на видео (символы после "v="):
            </p>
            <input type="text" onChange={e => setLink(e.currentTarget.value)} value={local.videoLink}/>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => closeModal()}>Закрыть</Button>
            <Button onClick={() => uploadVideo()} disabled={local.videoLink === ""}>Добавить</Button>
        </Modal.Footer>
    </Modal>
}