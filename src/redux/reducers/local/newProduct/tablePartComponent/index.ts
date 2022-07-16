import {IAttribute, IAttributeValue, IProductIdentity, IProductWithAttributes} from "../../../../../domain/types";
import {ISelectable} from "../../../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    addAttributeThunk,
    addProductToProductGroupThunk, changeAttributeOrderingThunk,
    getAttributesThunk,
    getProductsWithAttributes, getProductsWithoutGroupThunk, removeAttributeThunk, removeProductFromGroup,
    replaceProductInGroupThunk, swapProductSortingThunk
} from "./thunk";
import _ from "lodash";
import {store} from "../../../../store";

export type ProductWithAttributes = IProductWithAttributes & ISelectable

export type TablePartTabState = {

    productsWithAttr: ProductWithAttributes[],
    selectedProductWithAttr: ProductWithAttributes | null
    selectedAttributeColumn: number | null
    accumulatedChanges: IProductWithAttributes[]
    productGroupAttributes: number[]
    selectedGroupAttribute: number | null

    attributes: IAttribute[]
    selectedAttribute: IAttribute

    products: IProductIdentity[],
    selectedProduct: IProductIdentity | null,
}

const INITIAL_ATTRIBUTES: IAttribute[] = [{id: -1, name: 'loading'}]
const INITIAL_PRODUCTS: IProductIdentity[] = [{id: '1', name: 'loading'}]

const INITIAL_STATE: TablePartTabState = {
    productsWithAttr: [],
    selectedProductWithAttr: null,
    selectedAttributeColumn: null,
    accumulatedChanges: [],
    productGroupAttributes: [],
    selectedGroupAttribute: null,

    attributes: INITIAL_ATTRIBUTES,
    selectedAttribute: INITIAL_ATTRIBUTES[0],
    products: INITIAL_PRODUCTS,
    selectedProduct: INITIAL_PRODUCTS[0]
}

const slice = createSlice({
    name: 'new-product-table-tab',
    initialState: INITIAL_STATE,
    reducers: {
        setSelectedAttribute(state: TablePartTabState, action: PayloadAction<number>) {
            state.selectedAttribute = state.attributes.find(x => x.id == action.payload)!;
        },
        setSelectedProduct(state: TablePartTabState, action: PayloadAction<string>) {
            state.selectedProduct = state.products.find(x => x.id === action.payload)!
        },
        setAttributeValue(state: TablePartTabState, action: PayloadAction<{productId: string, attributeId: number, value: string}>) {
            const product = state.productsWithAttr.find(x => x.id === action.payload.productId)
            if(product === undefined)
                return;
            const attribute = product.attributeValues.find(x => x.id === action.payload.attributeId);
            if(attribute === undefined)
                return;
            attribute.value = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(getAttributesThunk.fulfilled, (state, action) => {
            state.attributes = action.payload
        })
        builder.addCase(getAttributesThunk.rejected, (state, action) => {
            console.log(`Can't load attributes. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(getProductsWithAttributes.fulfilled, (state, action) => {
            state.productsWithAttr = action.payload.map(x => {return {
                id: x.id,
                name: x.name,
                attributeValues: x.attributeValues,
                sort: x.sort,
                selected: false
            }})

            // В целом антипаттерн, но на сайте редакса упоминается такая возможность + на stackoverflow.
            // обойти это можно через события, которые дергаются через
            // useEffect(() => {dispatch(setAttributesOrder)},[local.newProductState.common.productGroup.attributesColumnOrder])
            // Но тогда отслеживание стейта станет довольно тяжелым, поэтому дергаем один раз здесь
            const global = store.getState()
            state.productGroupAttributes = global.local.newProductState.common.productGroup.attributesColumnOrder!
        })

        builder.addCase(getProductsWithAttributes.rejected, (state, action) => {
            console.log(`Can't get group products. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(getProductsWithoutGroupThunk.fulfilled, (state, action) => {
            state.products = action.payload
        })
        builder.addCase(getProductsWithoutGroupThunk.rejected, (state, action) => {
            console.log(`Can't load product without groups. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(swapProductSortingThunk.fulfilled, (state, action) => {
            const indexFirst = state.productsWithAttr.findIndex(x => x.id === action.meta.arg.firstProductId);
            const indexSecond = state.productsWithAttr.findIndex(x => x.id === action.meta.arg.secondProductId);

            if(indexFirst === -1) {
                console.error(`Cant find product with Id ${action.meta.arg.firstProductId}`)
                return
            }
            if(indexSecond === -1) {
                console.error(`Cant find product with Id ${action.meta.arg.secondProductId}`)
                return
            }
            //делаем swap sort
            const temp = state.productsWithAttr[indexFirst].sort
            state.productsWithAttr[indexFirst].sort = state.productsWithAttr[indexSecond].sort
            state.productsWithAttr[indexSecond].sort = temp
        })
        builder.addCase(swapProductSortingThunk.rejected, (state, action) => {
            console.log(`Can't load product without groups. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(addProductToProductGroupThunk.fulfilled, (state, action) => {
            const maxSort = _.maxBy(state.productsWithAttr, x => x.sort)?.sort ?? 1
            const product = state.products.find(x => x.id === action.meta.arg.productIds[0])
            if(product === null)
                return

            state.products = state.products.filter(x => x.id !== product!.id);
            state.selectedProduct = null;


            const attributes: IAttributeValue[] = state.productGroupAttributes.map(x => {
                return {
                    id: x,
                    value: ""
                }
            });
            state.productsWithAttr.push({
                id: product!.id,
                selected: false,
                sort: maxSort,
                name: product!.name,
                attributeValues: attributes
            })
        })

        builder.addCase(addProductToProductGroupThunk.rejected, (state, action) => {
            console.log(`Can't add product to group. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })


        builder.addCase(replaceProductInGroupThunk.fulfilled, (state, action) => {
            const index = state.productsWithAttr.findIndex(x => x.id === action.meta.arg.productId)
            if(index === -1) {
                console.error("Cant find product to change")
                return
            }
            const productIdentity: IProductIdentity = {
                id: state.productsWithAttr[index]!.id,
                name: state.productsWithAttr[index]!.name
            }

            const newProductId = action.meta.arg.newProductId;
            const newProduct = state.products.find(x => x.id === newProductId)

            //изменяем список продуктов
            state.products.push(productIdentity)
            state.products = state.products.filter(x => x.id !== newProductId)

            //изменяем запись в таблице
            state.productsWithAttr[index].id = newProduct!.id
            state.productsWithAttr[index].name = newProduct!.name
            state.productsWithAttr[index].attributeValues.forEach(x => x.value = "")
        })
        builder.addCase(replaceProductInGroupThunk.rejected, (state, action) => {
            console.log(`Can't replace products in group. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(removeProductFromGroup.fulfilled, (state, action) => {
            //удаляем запись в таблице
            state.productsWithAttr = state.productsWithAttr.filter(x => x.id !== action.meta.arg.productId)
            //зануляем выбранный ряд в таблице
            state.selectedProductWithAttr = null
        })
        builder.addCase(removeProductFromGroup.rejected, (state, action) => {
            console.log(`Can't load attributes. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(addAttributeThunk.fulfilled, (state, action) => {
            const attributeId = action.meta.arg.attributeId;
            //добавляем аттрибут в список
            state.productGroupAttributes.push(attributeId)
            state.productsWithAttr.forEach(x => {
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
            state.productGroupAttributes = state.productGroupAttributes.filter(x => x !== attributeId)
            state.productsWithAttr.forEach(x => {
                x.attributeValues = x.attributeValues.filter(x => x.id !== attributeId)
            })
        })
        builder.addCase(removeAttributeThunk.rejected, (state, action) => {
            console.log(`Can't remove attribute. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(changeAttributeOrderingThunk.fulfilled, (state, action) => {
            state.productGroupAttributes = action.meta.arg.attributes
        })
        builder.addCase(changeAttributeOrderingThunk.rejected, (state, action) => {
            console.log(`Can't change attribute order. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const actions = slice.actions;
const reducer = slice.reducer;

export {actions, reducer}