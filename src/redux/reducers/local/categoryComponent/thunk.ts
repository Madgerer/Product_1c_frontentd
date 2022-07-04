import {createAsyncThunk} from "@reduxjs/toolkit";
import {IRejectQueryThunk} from "../../../types";
import {actions} from "./index";
import Api from "../../../../api";
import {CatalogGroup, ICategory, IProductGroupIdentity, IProductIdentity} from "../../../../domain/types";

export const uploadProductGroupFromCatalogsThunk = createAsyncThunk<IProductGroupIdentity[],
    {priceGroupId: number,
        languageId: number,
        searchString: string,
        distributionType: number,
        catalogId: number,
        sellmarkId: number},
    {rejectValue: IRejectQueryThunk}>(
    'category-page/get-product-groups',
    async (args, thunkAPI) => {
        try {
            thunkAPI.dispatch(actions.setGroupsLoading(true));

            const response = await Api.productGroups.getProductsGroupsFromCatalog(
                args.priceGroupId,
                args.languageId,
                args.searchString,
                args.distributionType,
                args.catalogId,
                args.sellmarkId
            );
            thunkAPI.dispatch(actions.setGroupsLoading(false))

            if(!response.success)
                return thunkAPI.rejectWithValue({exception: response.exception?.text ?? null, statusCode: response.status})

            return response.data!;
        } catch (e) {
            return thunkAPI.rejectWithValue({exception: "net::ERR_CONNECTION_REFUSED", statusCode: 0})
        }
    });

//todo: подумать как вынести в один метод. Пока не хочется передавать LoadingAction т.к. это усложнит понимание кода
export const getProductByGroupFromCategoryThunk = createAsyncThunk<{products: IProductIdentity[], productGroupId: string},
    {productGroupId: string, languageId: number},
    {rejectValue: IRejectQueryThunk}>(
    'categoryPage/get-product-by-group',
    async (args, thunkAPI) => {
        try {

            thunkAPI.dispatch(actions.setProductGroupLoading({productGroupId: args.productGroupId, isLoading: true}));

            const response = await Api.product.getProductsIdentityByGroup(args.productGroupId, args.languageId);

            thunkAPI.dispatch(actions.setProductGroupLoading({productGroupId: args.productGroupId, isLoading: false}));

            if(!response.success)
                return thunkAPI.rejectWithValue({exception: response.exception?.text ?? null, statusCode: response.status})


            return {
                products: response.data!,
                productGroupId: args.productGroupId
            };
        } catch (e) {
            return thunkAPI.rejectWithValue({exception: "net::ERR_CONNECTION_REFUSED", statusCode: 0})
        }
    });

