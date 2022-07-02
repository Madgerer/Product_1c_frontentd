import {createAsyncThunk} from "@reduxjs/toolkit";
import {IRejectQueryThunk} from "../../../../types";
import Api from "../../../../../api";
import {actions} from "./index";
import {IProductIdentity} from "../../../../../domain/types";

export const getProductIdentityThunk = createAsyncThunk<IProductIdentity[],
    {priceGroupId: number, languageId: number},
    {rejectValue: IRejectQueryThunk}>(
    'product-page/get-products',
    async (args, thunkAPI) => {
        try {

            thunkAPI.dispatch(actions.setLoading(true))
            const response = await Api.product.getProductsIdentityWithoutGroup(args.priceGroupId, args.languageId);
            thunkAPI.dispatch(actions.setLoading(false))

            if(!response.success)
                return thunkAPI.rejectWithValue({exception: response.exception?.text ?? null, statusCode: response.status})

            return response.data!;
        } catch (e) {
            return thunkAPI.rejectWithValue({exception: "net::ERR_CONNECTION_REFUSED", statusCode: 0})
        }
    });
