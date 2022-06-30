import {createAsyncThunk} from "@reduxjs/toolkit";
import {IRejectQueryThunk} from "../../../../types";
import Api from "../../../../../api";
import {IProductIdentity} from "./types";
import {actions} from "./index";

export const getProductIdentityThunk = createAsyncThunk<IProductIdentity[],
    {priceGroupId: number, languageId: number},
    {rejectValue: IRejectQueryThunk}>(
    'product/identity-no-group',
    async (args, thunkAPI) => {
        try {

            thunkAPI.dispatch(actions.setLoading(true))

            const response = await Api.product.getProductsIdentity(args.priceGroupId, args.languageId);
            if(!response.success)
                return thunkAPI.rejectWithValue({exception: response.exception?.text ?? null, statusCode: response.status})

            thunkAPI.dispatch(actions.setLoading(false))

            return response.data!;
        } catch (e) {
            return thunkAPI.rejectWithValue({exception: "net::ERR_CONNECTION_REFUSED", statusCode: 0})
        }
    });
