import {Table} from "react-bootstrap";
import InformationTableRow from "../../common/ErrorTableRow";
import {IProductGroupBasicModel, IProductGroupIdentityModel} from "../../common/tables/productGroupTable/types";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {actions, TreeComponentState} from "../../../redux/reducers/local/treeComponent";
import {CatalogGroupsState} from "../../../redux/reducers/catalogGroups";
import {CatalogGroup} from "../../../domain/types";
import {getProductsGroupsBasicThunk} from "../../../redux/reducers/local/treeComponent/thunks";
import {LanguageState} from "../../../redux/reducers/languages";
import {CatalogState} from "../../../redux/reducers/catalogs";
import {CategoriesState} from "../../../redux/reducers/categories";

export default function TreeGroupTable() {
    const local = useSelector<AppState, TreeComponentState>(x => x.local.treeComponent);
    const catalogGroupState = useSelector<AppState, CatalogGroupsState>(x => x.catalogGroupState);
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState);
    const catalogState = useSelector<AppState, CatalogState>(x => x.catalogState);
    const categoryState = useSelector<AppState, CategoriesState>(x => x.categoriesState);
    const dispatch = useDispatch();

    useEffect(() => {
        if(categoryState.selectedCategory !== null) {
            dispatch(getProductsGroupsBasicThunk({
                languageId: languageState.selected.id,
                catalogGroup: catalogGroupState.selected.id,
                catalogId: catalogState.selected.id,
                validationType: local.selectedCardType.value,
                categoryId: categoryState.selectedCategory!.id,
                searchString: local.filter
            }))
        }
    }, [
        languageState.selected.id,
        catalogGroupState.selected.id,
        catalogState.selected.id,
        local.selectedCardType.value,
        categoryState.selectedCategory?.id,
        local.filter
    ])

    return <Table bordered hover className={"p-table"}>
        <thead>
        <tr>
            <th className="product-right-column-plus-wrapper"/>
            <th>Наименование</th>
            {catalogGroupState.selected.id === CatalogGroup.Printed ? <th>№</th> : <></> }
            <th></th>
            <th className="p-table-column-checkbox-wrapper"/>
            <th className="info"/>
        </tr>
        </thead>
        <tbody>
        {
            !local.isProductGroupsLoading
                ? local.productGroups.length === 0
                    ? <InformationTableRow text={"No matching records found"} colSpan={4}/>
                    : local.productGroups
                        .map(x => <ProductGroupTogglingRow key={x.id + x.name}
                                                           model={x}
                                                           onClick={model => {}}
                                                           onSelect={model => {} }
                                                           catalogGroup={catalogGroupState.selected.id}/>)
                : (<InformationTableRow text={"Loading..."} colSpan={5}/>)
        }
        </tbody>
    </Table>
}

function ProductGroupTogglingRow(props: ITogglingRowProps): JSX.Element {
    const [isToggle, setIsToggle] = useState(false)

    return <>
        <tr>
            <td className="product-right-column-plus-wrapper" onClick={_ => {
                //проверка на то что уже загружено поддерево
                if(props.model.products != null && !isToggle) {
                    setIsToggle(!isToggle)
                }
                else {
                    setIsToggle(!isToggle)
                    props.onClick(props.model)
                }
            }}>
                {isToggle
                    ? <i className="fa fa-minus bg-blue"></i>
                    : <i className="fa fa-plus bg-blue"></i>}
            </td>
            <td>
                {props.model.name}
            </td>
            {
                props.catalogGroup === CatalogGroup.Printed
                    ? <td>
                        {props.model.sort}
                    </td>
                    : <></>
            }
            <td></td>
            <td className="p-table-column-checkbox-wrapper" onClick={() => props.onSelect(props.model)}>
                <input type="checkbox" checked={props.model.checked} readOnly={true}/>
            </td>
            <td className={`info`}>
                <i className="fa fa-info-circle bg-blue"></i>
            </td>
        </tr>
        <tr className={`detail-view ${isToggle ? "-open" : ""}`}>
            <td colSpan={5}>
                {
                    //если данные по продукту загружаются, то тогда пишет Loading(можно прикрутить спиннер например)
                    !props.model.isLoading
                        ? props.model.products == null
                            ? "No data found"
                            : <table>
                                <thead>
                                <tr>
                                    <th className="toggling-view-code-column"> Код </th>
                                    <th> Наименование </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    props.model.products.map(x => {
                                        return <tr>
                                            <td>{x.id}</td>
                                            <td>{x.name}</td>
                                        </tr>
                                    })
                                }
                                </tbody>
                            </table>
                        : "Loading"
                }
            </td>
        </tr>
    </>
}

/*function getClassName(row: IProductGroupBasicModel): string {
    if (!row.isDescriptionChecked && !row.isImageChecked)
        return "bg-red"
    if (!row.isDescriptionChecked && row.isImageChecked)
        return "bg-orange"
    if (row.isDescriptionChecked && !row.isImageChecked)
        return "bg-yellow"
    return "bg-green";
}*/

interface ITogglingRowProps {
    model: IProductGroupBasicModel;
    onClick: (model: IProductGroupBasicModel) => void;
    onSelect: (model: IProductGroupBasicModel) => void;
    catalogGroup: number
}