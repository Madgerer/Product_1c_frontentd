export default function TablePartTab() {
    return <div id="products" className="tab-pane row">
        <div className="row" style={{marginRight:20}}>
            <div className="col-md-6 table-sm" style={{marginTop: 15, lineHeight: 0.6, fontSize: 13}}>
                <div className="col-md-12" style={{textAlign: "center"}}><h6>Техническое описание</h6></div>
                <textarea className="form-control" style={{height: 130}} rows={3}></textarea>
            </div>
            <div className="col-md-6 table-sm" style={{marginTop: 15, lineHeight: 0.6, fontSize: 13}}>
                <div className="col-md-12" style={{textAlign: "center"}}><h6>Техническое описание карточки товара</h6></div>
                <textarea className="form-control" style={{height: 130}} rows={3}></textarea>
            </div>
        </div>
        <div className="item col-md-12" style={{marginRight: 30, fontSize: 13}}>
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
                <input className="form-control" type="text" id="addprodent" placeholder="Артикул"
                       style={{width: 90, textAlign: "center", marginLeft: 10}}/>
                <div>Селектор товара</div>
                <button type="button" className="btn btn-dark">
                    <i className="fa  fa-arrow-up" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark">
                    <i className="fa  fa-arrow-down" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark">
                    <i className="fa  fa-plus" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark">
                    <i className="fa  fa-minus" aria-hidden="true"></i>
                </button>
                <div>Селектор аттрибутов</div>
                <input className="form-control" type="text" id="columnName" disabled={true} placeholder="Атрибут"
                       style={{width: 180, textAlign: "center", marginLeft:10}}/>
            </div>
            <div>
                <button type="button" className="btn btn-dark">
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark">
                    <i className="fa  fa-arrow-right" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark">
                    Сохранить
                </button>
            </div>

        </div>
        <div>
            Вот тут какая-то не рабочая таблица
        </div>
    </div>
}