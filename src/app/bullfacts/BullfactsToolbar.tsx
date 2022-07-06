export default function BullfactsToolbar() {
    return <div>
        <input className="form-control" type="search" placeholder="Поиск"/>
        <label className="form-check-label" style={{marginLeft:10}}>
            <input type="checkbox"  className="form-check-input"/>
            <span>Полнотекстовый поиск</span>
        </label>
        <input className="form-control" type="search" placeholder="Поиск по смыслу"/>
        <div>LanguageSelector</div>
        <div>Селектор типа объектов</div>
        <div>Селектор печатных каталогов</div>
        <div>Какой-то селектор</div>
    </div>
}