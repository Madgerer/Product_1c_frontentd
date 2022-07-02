import CatalogSelector from "../../common/catalogSelector/CatalogSelector";
import "./selectorBlock.scss"
import PriceGroupSelector from "../../common/priceGroupSelector/PriceGroupSelector";
import SellmarkSelector from "../../common/sellmarkSelector/SellmarkSelector";
import SimpleSelect, {IOptionType} from "../../common/SimpleSelect";

const catGroupsOptions: IOptionType[] = [
    {value:0, label: "АвтоDeloWeb"},
    {value:1, label: "Печатный каталог"},
    {value:2, label: "АвтоключWeb"}
]

const catGroupsInitial = catGroupsOptions[1];

export default function SelectorBlock() {
    return <div className="d-inline-block cat-selector-container" >
        <h3>Каталог:</h3>
        <div className="item align-top cat-selector-container-inner">
            <CatalogSelector/>
        </div>
        <h3>Ценовая группа:</h3>
        <div className="cat-selector-container-inner">
            <PriceGroupSelector/>
        </div>
        <h3>Торговая марка:</h3>
        <div className="cat-selector-container-inner">
            <SellmarkSelector/>
        </div>
        <h3>Группа каталогов:</h3>
        <div className="form-group input-group-sm cat-selector-container-inner" >
            <SimpleSelect value={catGroupsInitial}
                          options={catGroupsOptions}
                          onChange={value => {}}
                          toOption={value => value}
                          className={"selector"}/>
        </div>
    </div>
}