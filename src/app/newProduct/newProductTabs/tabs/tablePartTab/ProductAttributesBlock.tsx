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
import {actions as productGroupActions} from "../../../../../redux/reducers/local/newProduct/index";
import SimpleSelect from "../../../../common/basic/selectors/SimpleSelect";
import ToOptionProvider from "../../../../../utils/ToOptionProvider";
import {Table} from "react-bootstrap";
import Constants from "../../../../../domain/Constants";
import FaButton from "../../../../common/basic/buttons/FaButton";
import FastNullableSelector from "../../../../common/basic/selectors/FastNullableSelector";

export default function ProductAttributesBlock() {
    const local = useSelector<AppState, TableTabState>(x => x.local.newProductComponent.tableTabState)
    const productGroupState = useSelector<AppState, NewProductState>(x => x.local.newProductComponent.common)
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState)
    const dispatch = useDispatch();

    useEffect(() => {
        //мы должны загрузить все продукты без групп, в случае если у группы priceGroup=0 и нет продуктов
        const priceGroup = productGroupState.productGroup.priceGroupId === 0
            ? productGroupState.productGroup.priceGroupId === 0 && local.groupProducts.length == 0
                ? null
                : 0
            : productGroupState.productGroup.priceGroupId

        dispatch(getProductsWithoutGroupThunk({
            priceGroupId: priceGroup,
            languageId: languageState.selected.id
        }))

    },[productGroupState.productGroup.priceGroupId, languageState.selected.id])

    useEffect(() => {
        dispatch(getProductsWithAttributes({
            productGroupId: productGroupState.productGroup.id,
            languageId: languageState.selected.id
        }))
        dispatch(getAttributesThunk({languageId: languageState.selected.id}))
    }, [languageState.selected.id])

    //выставляем PriceGroup у продуктовой группы
    useEffect(() => {
        //в случае если у группы нет продуктов, то и PriceGroup не должно быть
        if(local.groupProducts.length == 0)
            dispatch(productGroupActions.setPriceGroup(0))
        //при добавлении первого продукта мы присваиваем группе PriceGroup
        if(local.groupProducts.length >= 1) {
            dispatch(productGroupActions.setPriceGroup(local.groupProducts[0].priceGroupId))
        }
    }, [local.groupProducts.length])

    const addProductToProductGroup = () => {
        if(local.selectedProduct?.id === null) {
            alert('Выберите продукт для добавления')
            return
        }
        if(local.groupProducts.findIndex(x => x.id === local.selectedProduct!.id) > -1){
            alert('Продукт уже добавлен')
            return
        }
        dispatch(addProductToProductGroupThunk({
            productGroupId: productGroupState.productGroup.id,
            productIds: [local.selectedProduct!.id]
        }))
    }

    const removeProductFromGroup = () => {
        if(local.selectedGroupProduct === null) {
            alert('Выберите продукт для удаления')
            return
        }
        dispatch(removeProductFromGroupThunk({
            productGroupId: productGroupState.productGroup.id,
            productId: local.selectedGroupProduct.id
        }))
    }

    const replaceProductInGroup = () => {
        if(local.selectedGroupProduct === null) {
            alert('Выберите продукт для замены')
            return
        }
        if(local.selectedProduct?.id === null) {
            alert('Выберите продукт которым заменить текущий')
            return
        }

        dispatch(replaceProductInGroupThunk({
            productGroupId: productGroupState.productGroup.id,
            productId: local.selectedGroupProduct.id,
            newProductId: local.selectedProduct!.id
        }))
    }

    const swapProductSort = (addition: number) => {
        if(local.selectedGroupProduct === null) {
            alert('Выберите продукт для перемещения')
            return
        }

        const targetSort = local.selectedGroupProduct.sort! + addition;
        if(targetSort > local.groupProducts.length){
            alert('Порядковый номер минимальный')
            return;
        }
        if(targetSort < 1){
            alert('Порядковый номер максимальный')
            return;
        }

        const targetProductToSwap = local.groupProducts.find(x => x.sort === targetSort);

        dispatch(swapProductSortThunk({
            firstProductId: local.selectedGroupProduct.id!,
            secondProductId: targetProductToSwap!.id
        }))
    }

    const addAttribute = () => {
        if(local.selectedAttribute === null) {
            alert("Выберите аттрибут для добавления")
            return
        }
        if(local.attributesOrder.findIndex(x => x === local.selectedAttribute.id) !== -1) {
            alert('Колонка уже добавлена')
            return;
        }

        dispatch(addAttributeThunk({
            attributeId: local.selectedAttribute.id,
            productGroupId: productGroupState.productGroup.id
        }))
    }

    const removeAttribute = () => {
        if(local.selectedAttributeColumn === null) {
            alert("Выберите колонку для удаления")
            return
        }
        dispatch(removeAttributeThunk({
            productGroupId: productGroupState.productGroup.id,
            attributeId: local.selectedAttributeColumn!
        }))
    }

    const changeAttributeOrder = (addition: number) => {
        const attributesOrder = [...local.attributesOrder];
        const selectedAttribute = local.selectedAttributeColumn
        if(selectedAttribute === null) {
            alert('Выберите колонку для изменения')
            return
        }
        const index = attributesOrder.findIndex(x => x === selectedAttribute)
        const targetIndex = index + addition;
        if(targetIndex >= attributesOrder.length)
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

    const onArticleEnter = (event) => {
        if (event.key === 'Enter') {
            const trimmedArticle = local.article.trim()
            const productToAdd = local.products.find(x => x.id === trimmedArticle)
            const isAlreadyAdded = local.groupProducts.findIndex(x => x.id === trimmedArticle) !== -1;
            if(isAlreadyAdded)
            {
                alert('Данный товар уже добавлен в карточку')
                return;
            }
            if(productToAdd === undefined) {
                alert('Данный товар не существует')
                return;
            }

            dispatch(addProductToProductGroupThunk({
                productGroupId: productGroupState.productGroup.id,
                productIds: [productToAdd.id]
            }))
        }
    }

    const setSelectedProduct = (id: string | null) => dispatch(actions.setSelectedProduct(id))
    const setArticle = (value:string) => dispatch(actions.setArticle(value))
    const setSelectedAttribute = (id: number) => dispatch(actions.setSelectedAttribute(id))
    const setAttributeValue = (productId: string, attrId: number, value: string) => dispatch(actions.setAttributeValue({
        productId: productId,
        value: value,
        attributeId: attrId
    }))
    const setRowSelected = (id: string) => dispatch(actions.setProductRowSelected(id))
    const setColumnSelected = (id: number) => dispatch(actions.setSelectedColumn(id))
    const setNewId = (productId: string, newId: string) => dispatch(actions.setNewId({productId: productId, newIdentifier: newId}))

    const replaceProductInGroupOnEnter = (event, currId: string, newId: string) => {
        if(event.key === 'Enter') {
            dispatch(replaceProductInGroupThunk({
                productGroupId: productGroupState.productGroup.id,
                productId: currId,
                newProductId: newId
            }))
        }
        if(event.key === "Escape")
        {
            dispatch(setNewId(currId, currId))
        }
    }

    return <>
        <div className="product-attributes-block-buttons-header" >

            <FaButton onClick={() => addProductToProductGroup()} faType={"fa-plus"}/>
            <FaButton onClick={() => replaceProductInGroup()} faType={"fa-pencil-square-o"}/>
            <FaButton onClick={() => removeProductFromGroup()} faType={"fa-minus"}/>

            <input className="form-control u-narrow-input"
                   type="text"
                   placeholder="Артикул"
                   value={local.article}
                   onChange={e => setArticle(e.currentTarget.value)}
                   style={{width: 90, textAlign: "center"}}
                   onKeyDown={(e) => onArticleEnter(e)}
            />


            <FastNullableSelector value={local.selectedProduct}
                            placeholder={"Наименование товара"}
                            options={local.products}
                            onChange={(e) => setSelectedProduct(e as string)}
                            toOption={ToOptionProvider.productIdentityToOption}
                            height={31}
                            noOptionsMessage={"No options"}
                            className={"selector selector--name"}/>

            <FaButton onClick={() => swapProductSort(-1)} faType={"fa-arrow-up"}/>
            <FaButton onClick={() => swapProductSort(1)} faType={"fa-arrow-down"}/>
            <FaButton onClick={() => addAttribute()} faType={"fa-plus"}/>
            <FaButton onClick={() => removeAttribute()} faType={"fa-minus"}/>

            <SimpleSelect value={local.selectedAttribute}
                          options={local.attributes}
                          onChange={(e) => setSelectedAttribute(e)}
                          className={"selector"}
                          height={31}
                          toOption={ToOptionProvider.attributeToOption} />

            <input className="form-control u-narrow-input" type="text" id="columnName" disabled={true} placeholder="Атрибут"
                   style={{width: 180, textAlign: "center"}}/>

            <FaButton onClick={() => changeAttributeOrder(-1)} faType={"fa-arrow-left"}/>
            <FaButton onClick={() => changeAttributeOrder(1)} faType={"fa-arrow-right"}/>

            <button type="button" disabled={local.accumulatedChanges.length === 0} className="btn btn-dark" onClick={() => saveAttributeValues()}>
                <span>Сохранить</span>
            </button>
        </div>
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Порядок</th>
                        <th>Код</th>
                        <th>Наименование</th>
                        {
                            local.attributesOrder.map(x => {
                                const attr = local.attributes.find(a => a.id == x)
                                if(attr === undefined)
                                    return null
                                return <th key={attr.id} onClick={() => setColumnSelected(attr!.id)}
                                           className={local.selectedAttributeColumn == attr!.id ? "bg-orange" : ""}>{attr!.name}</th>
                            }).filter(x => x !== null)
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    local.groupProducts.length == 0
                        ? <>
                            <tr>
                                <td colSpan={local.attributesOrder.length + 3}>No matching records found</td>
                            </tr>
                        </>
                        : <>
                            {
                                local.groupProducts.map(x => {
                                    return <tr onClick={() => setRowSelected(x.id)} className={x.selected ? "--selected" : ""} key={x.id}>
                                        <td>{x.sort}</td>
                                        <td>
                                            <div className="input-group-sm">
                                                <input className="form-control" value={x.newIdentifier}
                                                       onChange={(e) => setNewId(x.id, e.currentTarget.value)}
                                                       onKeyUp={event => replaceProductInGroupOnEnter(event, x.id, x.newIdentifier)}/>
                                            </div>
                                        </td>
                                        <td>{x.name}</td>
                                        {
                                            local.attributesOrder.map((a, i) => {
                                                const attrValue = x.attributeValues.find(x => x.id == a);
                                                if(attrValue === undefined)
                                                    return null
                                                return <td key={x.id.toString() + i.toString()}>
                                                    <div className="input-group-sm">
                                                        <input type="text"
                                                               className="form-control"
                                                               disabled={a === Constants.SortAttributeId}
                                                               value={attrValue?.value ?? ""}
                                                               onChange={(e) => setAttributeValue(x.id, attrValue!.id, e.currentTarget.value)}/>
                                                    </div>
                                                </td>
                                            }).filter(x => x !== null)
                                        }
                                    </tr>
                                })
                            }
                        </>
                }
                </tbody>
            </Table>
        </>
    </>
}