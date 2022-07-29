import {IAttribute, IAttributeValue, IProductIdentity, IProductWithAttributes} from "../../../../../domain/types";
import {ISelectable} from "../../../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    addAttributeThunk,
    addProductToProductGroupThunk, changeAttributeOrderThunk, changeAttributesValuesThunk,
    getAttributesThunk,
    getProductsWithAttributes, getProductsWithoutGroupThunk, removeAttributeThunk, removeProductFromGroupThunk,
    replaceProductInGroupThunk, swapProductSortThunk
} from "./thunk";
import _ from "lodash";
import Constants from "../../../../../domain/Constants";

export type ProductWithAttributes = IProductWithAttributes & ISelectable & {newIdentifier: string}

export type TableTabState = {
    groupProducts: ProductWithAttributes[],
    selectedGroupProduct: ProductWithAttributes | null
    selectedAttributeColumn: number | null
    accumulatedChanges: IProductWithAttributes[]
    attributesOrder: number[]
    selectedGroupAttribute: number | null

    attributes: IAttribute[]
    selectedAttribute: IAttribute

    products: IProductIdentity[],
    selectedProduct: IProductIdentity | null,

    article: string
}

const INITIAL_ATTRIBUTES: IAttribute[] = [{id: -1, name: 'loading'}]
const INITIAL_PRODUCTS: IProductIdentity[] = [{id: '1', name: 'loading', priceGroupId: 0}]

const INITIAL_STATE: TableTabState = {
    groupProducts: [],
    selectedGroupProduct: null,
    selectedAttributeColumn: null,
    accumulatedChanges: [],
    attributesOrder: [],
    selectedGroupAttribute: null,

    attributes: INITIAL_ATTRIBUTES,
    selectedAttribute: INITIAL_ATTRIBUTES[0],
    products: INITIAL_PRODUCTS,
    selectedProduct: INITIAL_PRODUCTS[0],
    article: ""
}

const slice = createSlice({
    name: 'new-product-table-tab',
    initialState: INITIAL_STATE,
    reducers: {
        setSelectedColumn(state: TableTabState, action: PayloadAction<number>) {
            if(state.selectedAttributeColumn === action.payload)
                state.selectedAttributeColumn = null
            else
                state.selectedAttributeColumn = action.payload
        },
        setSelectedAttribute(state: TableTabState, action: PayloadAction<number>) {
            state.selectedAttribute = state.attributes.find(x => x.id === action.payload)!;
        },
        setSelectedProduct(state: TableTabState, action: PayloadAction<string | null>) {
            if(action.payload === null)
            {
                state.selectedProduct = null
                return;
            }
            state.selectedProduct = state.products.find(x => x.id === action.payload)!
        },
        setNewId(state: TableTabState, action: PayloadAction<{productId: string, newIdentifier: string}>) {
            const product = state.groupProducts.find(x => x.id === action.payload.productId)
            if(product === undefined)
                return;
            product.newIdentifier = action.payload.newIdentifier
        },
        setAttributeValue(state: TableTabState, action: PayloadAction<{productId: string, attributeId: number, value: string}>) {
            const product = state.groupProducts.find(x => x.id === action.payload.productId)
            if(product === undefined)
                return;
            const attribute = product.attributeValues.find(x => x.id === action.payload.attributeId);
            if(attribute === undefined)
                return;
            attribute.value = action.payload.value
            const productChanges = state.accumulatedChanges.find(x => x.id === action.payload.productId);
            if(productChanges !== undefined){
                const attributeChanges = productChanges.attributeValues.find(x => x.id === action.payload.attributeId);
                if(attributeChanges !== undefined)
                    attributeChanges.value = action.payload.value
                else
                    productChanges.attributeValues.push({
                        id: action.payload.attributeId,
                        value: action.payload.value
                    })
            }
            else {
                state.accumulatedChanges.push({
                    id: product.id,
                    name: product.name,
                    sort: product.sort,
                    attributeValues: new Array({
                        id: action.payload.attributeId,
                        value: action.payload.value
                    }),
                    priceGroupId: product.priceGroupId
                })
            }
        },
        setArticle(state: TableTabState, action: PayloadAction<string>) {
            state.article = action.payload
        },
        setProductRowSelected(state: TableTabState, action: PayloadAction<string>) {
            for (const product of state.groupProducts) {
                if(product.id === action.payload) {
                    product.selected = true;
                    state.selectedGroupProduct = product
                }
                else {
                    product.selected = false
                }
            }

            if(state.selectedGroupProduct?.id !== action.payload)
                state.selectedGroupProduct = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(getAttributesThunk.fulfilled, (state, action) => {
            state.attributes = action.payload
            state.selectedAttribute = action.payload[0]
        })
        builder.addCase(getAttributesThunk.rejected, (state, action) => {
            console.log(`Can't load attributes. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(getProductsWithAttributes.fulfilled, (state, action) => {
            state.groupProducts = action.payload.products.map(x => {return {
                id: x.id,
                name: x.name,
                attributeValues: x.attributeValues,
                sort: x.sort,
                selected: false,
                priceGroupId: x.priceGroupId,
                newIdentifier: x.id
            }})
            state.attributesOrder = action.payload.attributesOrder!
        })

        builder.addCase(getProductsWithAttributes.rejected, (state, action) => {
            console.log(`Can't get group products. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(getProductsWithoutGroupThunk.fulfilled, (state, action) => {
            state.products = action.payload
            state.selectedProduct = null
        })
        builder.addCase(getProductsWithoutGroupThunk.rejected, (state, action) => {
            console.log(`Can't load product without groups. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(swapProductSortThunk.fulfilled, (state, action) => {
            const indexFirst = state.groupProducts.findIndex(x => x.id === action.meta.arg.firstProductId);
            const indexSecond = state.groupProducts.findIndex(x => x.id === action.meta.arg.secondProductId);

            if(indexFirst === -1) {
                console.error(`Cant find product with Id ${action.meta.arg.firstProductId}`)
                return
            }
            if(indexSecond === -1) {
                console.error(`Cant find product with Id ${action.meta.arg.secondProductId}`)
                return
            }
            //делаем swap sort
            const temp = state.groupProducts[indexFirst].sort
            state.groupProducts[indexFirst].sort = state.groupProducts[indexSecond].sort
            state.groupProducts[indexSecond].sort = temp

            //в случе если есть аттрибут Sort, тогда обновляем его
            const shouldUpdateSortAttribute = state.attributesOrder.find(x => x === Constants.SortAttributeId) !== undefined;
            if(shouldUpdateSortAttribute)
                state.groupProducts.forEach(x => {
                    x.attributeValues.forEach(attr => {
                        if(attr.id === Constants.SortAttributeId)
                            attr.value = x.sort!.toString()
                    })
                })
            //сортируем, чтобы не делать свап всех полей
            state.groupProducts = _.orderBy(state.groupProducts, value => value.sort)
            //выставляем выбранный продукт
            state.selectedGroupProduct = state.groupProducts[indexSecond]
        })
        builder.addCase(swapProductSortThunk.rejected, (state, action) => {
            console.log(`Can't load product without groups. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(addProductToProductGroupThunk.fulfilled, (state, action) => {
            const maxSort = _.maxBy(state.groupProducts, x => x.sort)?.sort ?? 0
            const productSort = maxSort + 1;
            const product = state.products.find(x => x.id === action.meta.arg.productIds[0])
            if(product === null)
                return

            state.selectedProduct = null;

            const attributes: IAttributeValue[] = state.attributesOrder.map(x => {
                return {
                    id: x,
                    value: x == Constants.SortAttributeId ? productSort.toString() : ""
                }
            });
            state.groupProducts.push({
                id: product!.id,
                selected: false,
                sort: productSort,
                name: product!.name,
                attributeValues: attributes,
                priceGroupId: product!.priceGroupId,
                newIdentifier: product!.id
            })
        })
        builder.addCase(addProductToProductGroupThunk.rejected, (state, action) => {
            console.log(`Can't add product to group. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(replaceProductInGroupThunk.fulfilled, (state, action) => {
            const index = state.groupProducts.findIndex(x => x.id === action.meta.arg.productId)
            if(index === -1) {
                console.error("Cant find product to change")
                return
            }
            const productIdentity: IProductIdentity = {
                id: state.groupProducts[index]!.id,
                name: state.groupProducts[index]!.name,
                priceGroupId: state.groupProducts[index]!.priceGroupId
            }

            const newProductId = action.meta.arg.newProductId;
            const newProduct = state.products.find(x => x.id === newProductId)

            //изменяем список продуктов
            state.products.push(productIdentity)
            state.products = state.products.filter(x => x.id !== newProductId)

            //изменяем запись в таблице
            state.groupProducts[index].id = newProduct!.id
            state.groupProducts[index].name = newProduct!.name
            state.groupProducts[index].attributeValues.forEach(x => {
                x.value = x.id == Constants.SortAttributeId ? state.groupProducts[index].sort!.toString() : ""
            })
            state.selectedProduct = null;
            state.selectedGroupProduct = state.groupProducts[index]
        })
        builder.addCase(replaceProductInGroupThunk.rejected, (state, action) => {
            console.log(`Can't replace products in group. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(removeProductFromGroupThunk.fulfilled, (state, action) => {
            const productToRemove = state.groupProducts.find(x => x.id === action.meta.arg.productId)
            //Уменьшаем у всех значение Sort без лишнего запроса к серверу за новыми данными
            const shouldUpdateSortAttribute = state.attributesOrder.find(x => x == Constants.SortAttributeId) !== undefined;
            state.groupProducts.forEach(x => {
                if(x.sort! > productToRemove!.sort!) {
                    x.sort = x.sort! - 1;
                    //в случае если в списке аттрибутов есть Sort, то обновляем его
                    if(shouldUpdateSortAttribute) {
                        x.attributeValues.forEach(attr => {
                            if(attr.id === Constants.SortAttributeId)
                                attr.value = x.sort!.toString()
                        })
                    }
                }
            })
            //удаляем запись в таблице
            state.groupProducts = state.groupProducts.filter(x => x.id !== action.meta.arg.productId)
            //зануляем выбранный ряд в таблице
            state.selectedGroupProduct = null
            state.products.push({id: productToRemove!.id, name: productToRemove!.name, priceGroupId: productToRemove!.priceGroupId})
        })
        builder.addCase(removeProductFromGroupThunk.rejected, (state, action) => {
            console.log(`Can't load attributes. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(addAttributeThunk.fulfilled, (state, action) => {
            const attributeId = action.meta.arg.attributeId;
            //добавляем аттрибут в список
            state.attributesOrder.push(attributeId)
            state.groupProducts.forEach(x => {
                x.attributeValues.push({
                    id: attributeId,
                    value: ""
                })
            })
        })
        builder.addCase(addAttributeThunk.rejected, (state, action) => {
            console.log(`Can't add attribute. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(removeAttributeThunk.fulfilled, (state, action) => {
            const attributeId = action.meta.arg.attributeId;
            //удаляем аттрибут из списка аттрибутов и у каждого продукта
            state.attributesOrder = state.attributesOrder.filter(x => x !== attributeId)
            state.groupProducts.forEach(x => {
                x.attributeValues = x.attributeValues.filter(x => x.id !== attributeId)
            })
        })
        builder.addCase(removeAttributeThunk.rejected, (state, action) => {
            console.log(`Can't remove attribute. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(changeAttributeOrderThunk.fulfilled, (state, action) => {
            state.attributesOrder = action.meta.arg.attributes
        })
        builder.addCase(changeAttributeOrderThunk.rejected, (state, action) => {
            console.log(`Can't change attribute order. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(changeAttributesValuesThunk.fulfilled, (state) => {
            state.accumulatedChanges = []
        })
        builder.addCase(changeAttributesValuesThunk.rejected, (state, action) => {
            console.log(`Can't change update attribute values. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const actions = slice.actions;
const reducer = slice.reducer;

export {actions, reducer}