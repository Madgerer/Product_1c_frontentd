export function TranslateForm() {
    return <div className = "col-md-4">
        <button className="btn btn-dark" style={{marginTop: 15}}>Выгрузка</button>
        <button className="btn btn-dark" style={{marginTop: 15}}>Справочник переводов</button>
        <button className="btn btn-dark" style={{marginTop: 15}}>Загрузить фразы на русском из 6 таблиц в БД</button>
        <button className="btn btn-dark" style={{marginTop: 15}}>Загрузить фразы из файла в справочник переводов</button>
        {/*<div className="form-group">
            <label htmlFor="FormControlFile">Выберите Excel файл для загрузки</label>
            <input type="file" className="form-control-file" enctype="multipart/form-data" name="excelFile"
                   id="FormControlFile">
        </div>*/}
        <form className="form-inline col-md-11"
              style={{border: "solid", borderWidth: 2, borderColor: "black", borderRadius:5, marginTop:20}}>
            <div className="d-flex flex-column align-items-start">
                <h4 style={{marginLeft:10}}>Форма для переводчика</h4>
                <label className="form-check-label" style={{marginLeft:10}}>
                    <input type="checkbox" className="form-check-input" id="nonTranslated"/>
                    <span>Только не переведенные</span>
                </label>
                <label className="form-check-label" style={{marginLeft:10}}>
                    <input type="checkbox" className="form-check-input" id="AllFacts"/>
                    <span>Все фразы</span>
                </label>
                <div style={{marginLeft:10, marginBottom:10}}>
                    <button id="translatorPage" type="button" className="btn btn-dark" style={{marginLeft:15}}>
                        Открыть форму для переводчика
                    </button>
                </div>
            </div>
        </form>
        <button id="UploadSiteData" type="button" className="btn btn-dark" style={{marginTop:10}}>Загрузить
            информацию на сайт
        </button>
        <button id="CompareContent" type="button" className="btn btn-dark" style={{marginTop:15}}>Сравнить контент
            сайта с блоком каталогов
        </button>
    </div>
}