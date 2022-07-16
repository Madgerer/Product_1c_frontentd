import './ProductAttributesBlock.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../../redux/reducers";
import {NewProductState} from "../../../../../redux/reducers/local/newProduct";
import {useEffect} from "react";
import {LanguageState} from "../../../../../redux/reducers/languages";
import {
    addAttributeThunk,
    addProductToProductGroupThunk, changeAttributeOrderThunk, changeAttributesValuesThunk,
    getAttributesThunk,
    getProductsWithAttributes,
    getProductsWithoutGroupThunk, removeAttributeThunk,
    removeProductFromGroupThunk,
    replaceProductInGroupThunk,
    swapProductSortThunk
} from "../../../../../redux/reducers/local/newProduct/tablePartComponent/thunk";
import {actions, TableTabState} from "../../../../../redux/reducers/local/newProduct/tablePartComponent";
import SimpleSelect from "../../../../common/SimpleSelect";
import ToOptionProvider from "../../../../../utils/ToOptionProvider";
import NullableSelect from "../../../../common/NullableSelect";
import _ from "lodash";
import {Table} from "react-bootstrap";

export default function ProductAttributesBlock() {
    const local = useSelector<AppState, TableTabState>(x => x.local.newProductState.tableTabState)
    const productGroupState = useSelector<AppState, NewProductState>(x => x.local.newProductState.common)
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsWithoutGroupThunk({
            priceGroupId: productGroupState.selectedPriceGroup!.id!,
            languageId: languageState.selected.id
        }))
        dispatch(getProductsWithAttributes({
            productGroupId: productGroupState.productGroup.id,
            languageId: languageState.selected.id
        }))
        dispatch(getAttributesThunk({languageId: languageState.selected.id}))
    },[productGroupState.selectedPriceGroup?.id, languageState.selected.id])

    const addProductToProductGroup = () => {
        if(local.selectedProduct?.id === null) {
            alert('Выберите продукт для добавления')
            return
        }
        dispatch(addProductToProductGroupThunk({
            productGroupId: productGroupState.productGroup.id,
            productIds: [local.selectedProduct!.id]
        }))
    }

    const removeProductFromGroup = () => {
        if(local.selectedProductWithAttr === null) {
            alert('Выберите продукт для удаления')
            return
        }
        dispatch(removeProductFromGroupThunk({
            productGroupId: productGroupState.productGroup.id,
            productId: local.selectedProductWithAttr.id
        }))
    }

    const replaceProductInGroup = () => {
        if(local.selectedProductWithAttr === null) {
            alert('Выберите продукт для замены')
            return
        }
        if(local.selectedProduct?.id === null) {
            alert('Выберите продукт которым заменить текущий')
            return
        }

        dispatch(replaceProductInGroupThunk({
            productGroupId: productGroupState.productGroup.id,
            productId: local.selectedProductWithAttr.id,
            newProductId: local.selectedProduct!.id
        }))
    }

    const swapProductSort = (addition: number) => {
        if(local.selectedProductWithAttr === null) {
            alert('Выберите продукт для перемещения')
            return
        }

        const targetSort = local.selectedProductWithAttr.sort! + addition;
        if(targetSort > local.productsWithAttr.length){
            alert('Порядковый номер минимальный')
            return;
        }
        if(targetSort < 1){
            alert('Порядковый номер максимальный')
            return;
        }

        const targetProductToSwap = local.productsWithAttr.find(x => x.sort === targetSort);

        dispatch(swapProductSortThunk({
            firstProductId: local.selectedProductWithAttr.id!,
            secondProductId: targetProductToSwap!.id
        }))
    }

    const addAttribute = () => {
        if(local.selectedAttribute === null) {
            alert("Выберите аттрибут для добавления")
            return
        }
        if(local.attributesOrder.findIndex(x => x === local.selectedAttribute.id) !== -1)
            return;

        dispatch(addAttributeThunk({
            attributeId: local.selectedAttribute.id,
            productGroupId: productGroupState.productGroup.id
        }))
    }

    const removeAttribute = () => {
        if(local.selectedAttributeColumn === null) {
            alert("Выберите колонку для удаления")
        }
        dispatch(removeAttributeThunk({
            productGroupId: productGroupState.productGroup.id,
            attributeId: local.selectedAttributeColumn!
        }))
    }

    const changeAttributeOrder = (addition: number) => {
        const attributesOrder = local.attributesOrder;
        const selectedAttribute = local.selectedAttributeColumn
        if(selectedAttribute === null) {
            alert('Выберите колонку для изменения')
            return
        }
        const index = attributesOrder.findIndex(x => x === selectedAttribute)
        const targetIndex = index + addition;
        if(targetIndex > attributesOrder.length)
            return;
        if(targetIndex < 0)
            return;

        const temp = attributesOrder[index]
        attributesOrder[index] = attributesOrder[targetIndex]
        attributesOrder[targetIndex] = temp

        dispatch(changeAttributeOrderThunk({
            productGroupId: productGroupState.productGroup.id,
            attributes: attributesOrder
        }))
    }

    const saveAttributeValues = () => {
        if(local.accumulatedChanges.length === 0)
            return

        let values: {attributeId: number, value: string, productId: string}[] = [];
        for (const productChanges of local.accumulatedChanges) {
            productChanges.attributeValues.map(x => {
                values.push({
                    value: x.value,
                    attributeId: x.id,
                    productId: productChanges.id
                })
            })
        }

        dispatch(changeAttributesValuesThunk({
            productGroupId: productGroupState.productGroup.id,
            values: values
        }))
    }

    const setSelectedProduct = (id: string | null) => dispatch(actions.setSelectedProduct(id))
    const setArticle = (value:string) => dispatch(actions.setArticle(value))
    const setSelectedAttribute = (id: number) => dispatch(actions.setSelectedAttribute(id))
    const setAttributeValue = (productId: string, attrId: number, value: string) => dispatch(actions.setAttributeValue)

    return <>
        {
            productGroupState.productGroup.priceGroupId === null
                ? <div>Мы не можем продолжить без выбранной продуктовой группы</div>
                : <>
                    <div className="item col-md-12" style={{marginRight: 30, fontSize: 13}}>
                        <div>
                            <button type="button" className="btn btn-dark" onClick={() => addProductToProductGroup()}>
                                <i className="fa  fa-plus" aria-hidden="true"/>
                            </button>
                            <button type="button" className="btn btn-dark" onClick={() => replaceProductInGroup()}>
                                <i className="fa  fa-pencil-square-o" aria-hidden="true"/>
                            </button>
                            <button type="button" className="btn btn-dark" onClick={() => removeProductFromGroup()}>
                                <i className="fa  fa-minus" aria-hidden="true"/>
                            </button>
                            <input className="form-control"
                                   type="text"
                                   placeholder="Артикул"
                                   value={local.article}
                                   onChange={e => setArticle(e.currentTarget.value)}
                                   style={{width: 90, textAlign: "center", marginLeft: 10}} />


                            <NullableSelect value={local.selectedProduct}
                                              placeholder={"Наименование товара"}
                                              options={local.products}
                                              onChange={(e) => setSelectedProduct(e as string)}
                                              toOption={ToOptionProvider.productIdentityToOption}
                                              className={"selector"}/>

                            <button type="button" className="btn btn-dark" onClick={() => {swapProductSort(1)}}>
                                <i className="fa  fa-arrow-up" aria-hidden="true"/>
                            </button>
                            <button type="button" className="btn btn-dark" onClick={() => {swapProductSort(-1)}}>
                                <i className="fa  fa-arrow-down" aria-hidden="true"/>
                            </button>
                            <button type="button" className="btn btn-dark" onClick={() => addAttribute()}>
                                <i className="fa  fa-plus" aria-hidden="true"/>
                            </button>
                            <button type="button" className="btn btn-dark" onClick={() => removeAttribute()}>
                                <i className="fa  fa-minus" aria-hidden="true"/>
                            </button>
                            <SimpleSelect value={local.selectedAttribute}
                                          options={local.attributes}
                                          onChange={(e) => setSelectedAttribute(e)}
                                          className={"selector"}
                                          toOption={ToOptionProvider.attributeToOption} />
                            <input className="form-control" type="text" id="columnName" disabled={true} placeholder="Атрибут"
                                   style={{width: 180, textAlign: "center", marginLeft:10}}/>
                        </div>
                        <div>
                            <button type="button" className="btn btn-dark" onClick={() => changeAttributeOrder(-1)}>
                                <i className="fa fa-arrow-left" aria-hidden="true"/>
                            </button>
                            <button type="button" className="btn btn-dark" onClick={() => changeAttributeOrder(1)}>
                                <i className="fa  fa-arrow-right" aria-hidden="true"/>
                            </button>
                            <button type="button" disabled={local.accumulatedChanges.length === 0} className="btn btn-dark" onClick={() => saveAttributeValues()}>
                                Сохранить
                            </button>
                        </div>

                    </div>
                    <>
                        <Table>
                            <thead>
                                <th>Порядок</th>
                                <th>Код</th>
                                <th>Наименование</th>
                                {
                                    local.attributesOrder.map(x => {
                                        const attr = local.attributes.find(a => a.id == x)
                                        if(attr === null)
                                            return null
                                        return <th>{attr!.name}</th>
                                    }).filter(x => x !== null)
                                }
                            </thead>
                            <tbody>
                                {
                                    local.productsWithAttr.map(x => {
                                        return <tr>
                                            <td>{x.sort}</td>
                                            <td>{x.id}</td>
                                            <td>{x.name}</td>
                                            {
                                                local.attributesOrder.map(a => {
                                                    const attrValue = x.attributeValues.find(x => x.id == a);
                                                    if(attrValue === null)
                                                        return null
                                                    return <td>
                                                        <input type="text" value={attrValue?.value ?? ""}
                                                               onChange={(e) => setAttributeValue(x.id, attrValue!.id, e.currentTarget.value)}/>
                                                    </td>
                                                }).filter(x => x !== null)
                                            }
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                    </>
                </>
        }
    </>
}