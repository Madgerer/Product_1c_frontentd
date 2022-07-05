import {createAsyncThunk} from "@reduxjs/toolkit";
import {IRejectQueryThunk} from "../../../../types";
import Api from "../../../../../api";
import {actions} from "./index";
import {ICardDistributionType, IProductGroupIdentity, IProductIdentity} from "../../../../../domain/types";

export const getProductsGroupsIdentityThunk = createAsyncThunk<IProductGroupIdentity[],
    {priceGroupId: number, languageId: number, searchString: string, cardValidationType: ICardDistributionType},
    {rejectValue: IRejectQueryThunk}>(
    'product-page/get-product-groups',
    async (args, thunkAPI) => {
        try {

            thunkAPI.dispatch(actions.setLoading(true));

            const response = await Api.productGroups.getProductsGroupsIdentity(args.priceGroupId,
                args.languageId,
                args.searchString,
                args.cardValidationType);

            thunkAPI.dispatch(actions.setLoading(false));

            if(!response.success)
                return thunkAPI.rejectWithValue({exception: response.exception?.text ?? null, statusCode: response.status})


            return response.data!;
        } catch (e) {
            return thunkAPI.rejectWithValue({exception: "net::ERR_CONNECTION_REFUSED", statusCode: 0})
        }
    });

export const getProductByGroupThunk = createAsyncThunk<{products: IProductIdentity[], productGroupId: string},
    {productGroupId: string, languageId: number},
    {rejectValue: IRejectQueryThunk}>(
    'product-page/get-product-by-group',
    async (args, thunkAPI) => {
        try {

            thunkAPI.dispatch(actions.setProductGroupLoading({
                productGroupId: args.productGroupId,
                isLoading: true}));

            const response = await Api.product.getProductsIdentityByGroup(args.productGroupId, args.languageId);

            thunkAPI.dispatch(actions.setProductGroupLoading({
                productGroupId: args.productGroupId,
                isLoading: false}));

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