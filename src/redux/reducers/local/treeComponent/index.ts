import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {numericRestrictions} from "../../../../utils/regexpUtlis";
import {ICardDistributionType} from "../../../../domain/types";
import {
    changeProductGroupSortThunk,
    getProductGroupsBasicThunk,
    getProductsByGroupThunk,
    recountProductGroupSortThunk,
    removeProductGroupFromCatsThunk
} from "./thunks";
import {IProductGroupIdentityModel} from "../../../../app/common/tables/productGroupTable/types";


export type TreeComponentState = {
    productGroups: IProductGroupIdentityModel[],
    selectedGroups: IProductGroupIdentityModel[],
    lastSelected: IProductGroupIdentityModel | null,
    minSort: number,
    maxSort: number,
    filter: string,
    isProductGroupsLoading: boolean,
    sortNumber: string,
    selectedCardType: ICardDistributionType,
    cardTypes: ICardDistributionType[],
    wasInit: boolean
}

const INITIAL_STATE: TreeComponentState = {
    selectedGroups: [],
    productGroups: [],
    minSort: -1,
    maxSort: -1,
    filter: "",
    isProductGroupsLoading: false,
    sortNumber: "",
    cardTypes: [
        {label: "Все карточки", value: 0},
        {label: "Непроверенное описание", value: 1},
        {label: "Непроверенное фото", value: 2},
        {label: "Проверено все", value: 3}
    ],
    lastSelected: null,
    selectedCardType: {label: "Все карточки", value: 0},
    wasInit: false
}

const sortValidationRegex = numericRestrictions();

const slice = createSlice({
    name: "treePage/groupList",
    initialState: INITIAL_STATE,
    reducers: {
        setWasInit(state: TreeComponentState) {
          state.wasInit = true
        },
        setFilter(state: TreeComponentState, action: PayloadAction<string>) {
            state.filter = action.payload.toLowerCase()
            return state;
        },
        setSortNumber(state: TreeComponentState, action: PayloadAction<string>) {
            const noRestrictions = sortValidationRegex.test(action.payload)
            if(noRestrictions) {
                state.sortNumber = action.payload;
            }
            return state;
        },
        setSelectedCardType(state: TreeComponentState, action: PayloadAction<number>) {
            state.selectedCardType = state.cardTypes.find(x => x.value === action.payload) ?? state.selectedCardType;
            return state;
        },
        setSelectedProductGroup(state: TreeComponentState, action: PayloadAction<IProductGroupIdentityModel>) {
            const index = state.productGroups.findIndex(x => x.id === action.payload.id)
            const selectedIndex = state.selectedGroups.findIndex(x => x.id === action.payload.id);
            for (const productGroup of state.productGroups) {
                if(productGroup.id === action.payload.id) {
                    productGroup.isLastActive = true;
                    state.lastSelected = action.payload;
                    state.sortNumber = productGroup?.sort?.toString() ?? ""
                }
                productGroup.isLastActive = productGroup.id === action.payload.id;
            }

            if(selectedIndex > -1) {
                state.selectedGroups = state.selectedGroups.splice(selectedIndex, 1)
            }
            else {
                state.selectedGroups.push(action.payload);
            }
            if(index > -1) {
                state.productGroups[index].checked = !action.payload.checked
            }
        },
        setProductGroupsEmpty(state: TreeComponentState) {
            state.isProductGroupsLoading = false
            state.productGroups = []
            state.sortNumber = ""
            state.lastSelected = null
            state.selectedGroups = []
        },
        clearStateOnUnmount(state: TreeComponentState) {
            state.wasInit = false
            state.isProductGroupsLoading = false
            state.productGroups = []
            state.sortNumber = ""
            state.lastSelected = null
            state.selectedGroups = []
            state.filter = ""
        }
    },
    extraReducers: builder => {
        builder.addCase(getProductGroupsBasicThunk.pending, (state) => {
            state.isProductGroupsLoading = true;
            return state;
        })
        builder.addCase(getProductGroupsBasicThunk.fulfilled, (state, action) => {
            state.sortNumber = ""
            state.lastSelected = null
            state.productGroups = action.payload.products.map(x => {
                return{
                    id: x.id,
                    name: x.name,
                    checked: false,
                    isImageChecked: x.isImageChecked,
                    isLoading: false,
                    products: null,
                    isDescriptionChecked: x.isDescriptionChecked,
                    sort: x.sort,
                    isLastActive: false
                }
            });
            state.minSort = action.payload.minSort
            state.maxSort = action.payload.maxSort

            state.isProductGroupsLoading = false;
            return state;
        })
        builder.addCase(getProductGroupsBasicThunk.rejected, (state, action) => {
            state.isProductGroupsLoading = false;
            state.productGroups = []
            state.minSort = 0;
            state.maxSort = 0;
            console.log(`Can't get product groups identities. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(getProductsByGroupThunk.pending, (state, action) => {
            const index = state.productGroups.findIndex(x => x.id === action.meta.arg.productGroupId)
            if(index >= 0)
                state.productGroups[index].isLoading = true;
            return state;
        })
        builder.addCase(getProductsByGroupThunk.fulfilled, (state, action) => {
            const index = state.productGroups.findIndex(x => x.id === action.meta.arg.productGroupId)
            if(index >= 0) {
                state.productGroups[index].products = action.payload;
                state.productGroups[index].isLoading = false;
            }
            return state;
        })
        builder.addCase(getProductsByGroupThunk.rejected, (state, action) => {
            const index = state.productGroups.findIndex(x => x.id === action.meta.arg.productGroupId)
            if(index >= 0)
                state.productGroups[index].isLoading = false;
            console.log(`Can't get products identities. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(recountProductGroupSortThunk.fulfilled, (state, action) => {
            state.productGroups.forEach(pg => {
                const pgSort = action.payload.find(x => x.id === pg.id);
                if(pgSort !== undefined) {
                    pg.sort = pgSort.sort
                }
            })
        })

        builder.addCase(recountProductGroupSortThunk.rejected, (state, action) => {
            console.log(`Can't get products identities. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(changeProductGroupSortThunk.fulfilled, (state, action) => {
            action.payload.forEach(sort => {
                const index = state.productGroups.findIndex(x => x.id === sort.id)
                if(index > -1) {
                    state.productGroups[index].sort = sort.sort;
                }
            })
            state.lastSelected!.sort = action.meta.arg.targetSort;
            state.sortNumber = action.meta.arg.targetSort.toString();
        })

        builder.addCase(changeProductGroupSortThunk.rejected, (state, action) => {
            console.log(`Can't change sort. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
            //временно
            if(action.payload?.statusCode === 422)
                alert(`Сортировка текущих данных выполнена неверно. Есть несколько записей с сортировочными номером '№${action.meta.arg.targetSort}'`)
        })

        builder.addCase(removeProductGroupFromCatsThunk.fulfilled, (state, action) => {
            //удаляем присвоенные группы из списка
            state.productGroups = state.productGroups.filter(x => action.meta.arg.productGroupIds.findIndex(id => id === x.id) === -1)
        })
        builder.addCase(removeProductGroupFromCatsThunk.rejected, (state, action) => {
            console.log(`Can't remove from categories. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const actions = slice.actions;
const reducer = slice.reducer;

export {actions, reducer}