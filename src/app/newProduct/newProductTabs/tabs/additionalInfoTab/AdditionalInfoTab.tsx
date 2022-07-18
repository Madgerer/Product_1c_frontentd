export default function AdditionalInfoTab() {
    return <div className="tab-pane row">
        <div>
            <div>
                <button type="button" className="btn btn-dark">
                    <i className="fa  fa-plus" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark">
                    <i className="fa  fa-minus" aria-hidden="true"></i>
                </button>
                <div>Какой-то селектор продуктов</div>
                <button type="button" className="btn btn-dark">
                    <i className="fa  fa-arrow-up" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark">
                    <i className="fa  fa-arrow-down" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark">
                    Добавить
                </button>
                <button type="button" className="btn btn-dark">
                    Отменить
                </button>
            </div>
            <div>
                какая-то таблица рекомендаций
            </div>
        </div>
        <div>
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
        </div>
    </div>
}