import {createAsyncThunk} from "@reduxjs/toolkit";
import {IPriceGroup} from "./types";
import {IRejectQueryThunk} from "../../types";
import Api from "../../../api";

export const uploadPriceGroups = createAsyncThunk<IPriceGroup[], void, {rejectValue: IRejectQueryThunk}>(
    'upload/priceGroups',
    async (args, thunkAPI) => {
        try {
            const response = await Api.priceGroup.getPriceGroups();
            if(!response.success)
                return thunkAPI.rejectWithValue({exception: response.exception?.text ?? null, statusCode: response.status})

            return response.data!
        }
        catch (e) {
            return thunkAPI.rejectWithValue({exception: "net::ERR_CONNECTION_REFUSED", statusCode: 0})
        }
    });