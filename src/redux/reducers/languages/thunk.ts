import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../../api";
import {IRejectQueryThunk} from "../../types";
import {ILanguage} from "../../../domain/types";


export const uploadLanguagesThunk = createAsyncThunk<ILanguage[], void, {rejectValue: IRejectQueryThunk}>(
    'upload/languages',
    async (_, thunkAPI) => {
        try {
            const response = await Api.translate.getLanguages();
            if(!response.success)
                return thunkAPI.rejectWithValue({exception: response.exception?.text ?? null, statusCode: response.status})

            return response.data!
        }
        catch (e) {
            return thunkAPI.rejectWithValue({exception: "net::ERR_CONNECTION_REFUSED", statusCode: 0})
        }
    });