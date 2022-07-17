import Api from "../../../../../api";

export default function GraphicPartTab(){
    const  onFileChange = async event => {
        // Update the state
        console.log(event.target.files[0])
        if (event.target.files[0] !== null || event.target.files[0] !== undefined) {
            await Api.images.uploadImage({productGroupId: '707025', imageType: 1, image: event.target.files[0]})
        }
    };

    //return <div>"Графическая информация"</div>
    return <div className="">
        <div className="item col-md-12" style={{marginTop: 15}}>
            <button type="button" className="btn btn-dark">
                <i className="fa  fa-plus" aria-hidden="true"></i>
            </button>
            <button type="button" className="btn btn-dark">
                <i className="fa  fa-minus" aria-hidden="true"></i>
            </button>
            <div>ImageType selector</div>
            <input className="form-control" type="text" id="imgName" placeholder="Тип для удаления" disabled/>
            <button type="button" className="btn btn-dark">
                <i className="fa fa-file-image-o" aria-hidden="true"></i>
            </button>
            <input type="file" onChange={onFileChange} />
            <div>Кастомный файл инпут</div>
            <button type="button" className="btn btn-dark">
                Добавить видео
            </button>
            <button type="button" className="btn btn-dark" disabled={true}>
                Обновить на сайте
            </button>
        </div>
        <div>Тут судя по коду какая-то таблица</div>
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
    </div>
}