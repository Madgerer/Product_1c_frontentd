import {createAsyncThunk} from "@reduxjs/toolkit";
import {IRejectQueryThunk} from "../../types";
import Api from "../../../api";
import {ICatalog} from "../../../domain/types";

export const uploadCatalogs = createAsyncThunk<ICatalog[], void, {rejectValue: IRejectQueryThunk}>(
    'upload/catalogs',
    async (args, thunkAPI) => {
        try {
            const response = await Api.catalogs.getCatalogs();
            if(!response.success)
                return thunkAPI.rejectWithValue({exception: response.exception?.text ?? null, statusCode: response.status})

            return response.data!
        }
        catch (e) {
            return thunkAPI.rejectWithValue({exception: "net::ERR_CONNECTION_REFUSED", statusCode: 0})
        }
    });