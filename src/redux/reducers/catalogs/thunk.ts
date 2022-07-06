import {createAsyncThunk} from "@reduxjs/toolkit";
import {IRejectQueryThunk} from "../../types";
import Api from "../../../api";
import {ICatalog} from "../../../domain/types";
import {actions} from "./index";
import {createApiThunk, createNoArgsApiThunk} from "../../createApiThunk";

export const getCatalogs = createNoArgsApiThunk({
    typePrefix: "get/catalogs",
    apiCall: Api.catalogs.getCatalogs
})

export const uploadCatalogs = createAsyncThunk<ICatalog[], void, {rejectValue: IRejectQueryThunk}>(
    '',
    async (args, thunkAPI) => {
        try {
            const response = await Api.catalogs.getCatalogs();
            thunkAPI.dispatch(actions.setInited())
            if(!response.success)
                return thunkAPI.rejectWithValue({exception: response.exception?.text ?? null, statusCode: response.status})

            thunkAPI.dispatch(actions.setSelected(response.data![0].id))
            return response.data!
        }
        catch (e) {
            return thunkAPI.rejectWithValue({exception: "net::ERR_CONNECTION_REFUSED", statusCode: 0})
        }
    });