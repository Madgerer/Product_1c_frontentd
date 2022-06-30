import {createAsyncThunk} from "@reduxjs/toolkit";
import {IRejectQueryThunk} from "../../types";
import Api from "../../../api";
import {ISellmark} from "./types";

export const uploadSellmarks = createAsyncThunk<ISellmark[], void, {rejectValue: IRejectQueryThunk}>(
    'upload/sellmarks',
    async (args, thunkAPI) => {
        try {
            const response = await Api.sellmarks.getSellmarks();
            if(!response.success)
                return thunkAPI.rejectWithValue({exception: response.exception?.text ?? null, statusCode: response.status})

            return response.data!
        }
        catch (e) {
            return thunkAPI.rejectWithValue({exception: "net::ERR_CONNECTION_REFUSED", statusCode: 0})
        }
    });