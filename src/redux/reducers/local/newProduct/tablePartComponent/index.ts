import {IAttribute, IAttributeValue, IProductIdentity, IProductWithAttributes} from "../../../../../domain/types";
import {ISelectable} from "../../../../types";
import {createSlice} from "@reduxjs/toolkit";
import {addProductToProductGroupThunk, getAttributesThunk, replaceProductInGroupThunk} from "./thunk";
import _ from "lodash";

export type ProductWithAttributes = IProductWithAttributes & ISelectable

export type TablePartTabState = {

    productsWithAttr: ProductWithAttributes[],
    selectedProductWithAttr: ProductWithAttributes | null
    selectedAttributeColumn: number | null
    accumulatedChanges: IProductWithAttributes[]

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
    attributes: INITIAL_ATTRIBUTES,
    selectedAttribute: INITIAL_ATTRIBUTES[0],
    products: INITIAL_PRODUCTS,
    selectedProduct: INITIAL_PRODUCTS[0]
}

const createDefaultAttributeSet = (): IAttributeValue[] => {
    const sortAttribute = 1;
    const weightAttribute = 57;
    return [
        {
            id: sortAttribute,
            value: '1'
        },
        {
            id: weightAttribute,
            value: '0'
        }]
}

const slice = createSlice({
    name: 'new-product-table-tab',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAttributesThunk.fulfilled, (state, action) => {
            state.attributes = action.payload
        })
        builder.addCase(getAttributesThunk.rejected, (state, action) => {
            console.log(`Can't load attributes. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(addProductToProductGroupThunk.fulfilled, (state, action) => {
            const maxSort = _.maxBy(state.productsWithAttr, x => x.sort)?.sort ?? 1
            const product = state.products.find(x => x.id === action.meta.arg.productIds[0])
            if(product === null)
                return

            state.products = state.products.filter(x => x.id !== product!.id);
            state.selectedProduct = null;

            const attributes = state.productsWithAttr.length === 0
                ? createDefaultAttributeSet()
                : _.first(state.productsWithAttr)!.attributeValues.map(x => {
                    return {
                        id: x.id,
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
            const productToChange = state.productsWithAttr.find(x => x.id === action.meta.arg.productId);
            const productIdentity: IProductIdentity = {
                id: productToChange!.id,
                name: productToChange!.name
            }
        })
        builder.addCase(replaceProductInGroupThunk.rejected, (state, action) => {
            console.log(`Can't replace products in group. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})