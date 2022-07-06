export function TranslateSettings() {
    return <>
        <div>
            Languages
        </div>
        <div>
            Catalogs
        </div>
        <div>
            Websites
        </div>
        <div className="row col-md-12">
            <form className="form-inline col-md-4">
                <label className="form-check-label" style={{marginLeft:10}}>
                    <input type="checkbox" className="form-check-input"/>
                    <span>КатегорииПК</span>
                </label>
                <label className="form-check-label" style={{marginLeft:10}}>
                    <input type="checkbox" className="form-check-input"/>
                    <span>КатегорииСайт</span>
                </label>
                <label className="form-check-label" style={{marginLeft:10}}>
                    <input type="checkbox" className="form-check-input"/>
                    <span>Атрибуты</span>
                </label>
                <label className="form-check-label" style={{marginLeft:10}}>
                    <input type="checkbox" className="form-check-input"/>
                    <span>Пиктограммы</span>
                </label>
                <label className="form-check-label" style={{marginLeft:10}}>
                    <input type="checkbox" className="form-check-input"/>
                    <span>ТехОписание</span>
                </label>
                <label className="form-check-label" style={{marginLeft:10}}>
                    <input type="checkbox" className="form-check-input"/>
                    <span>ОписаниеК2У</span>
                </label>
            </form>
            <div className="col-md-8">
                <button id="LightAll" type="button" className="btn btn-dark" style={{marginTop:15}}>Выделить все</button>
                <button id="HideAll" type="button" className="btn btn-dark" style={{marginTop:15}}>Очистить все</button>
            </div>
        </div>
    </>
}