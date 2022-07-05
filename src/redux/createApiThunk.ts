import {AsyncThunkPayloadCreator, createAsyncThunk} from "@reduxjs/toolkit";
import {IApplicationResponse} from "../api/baseTypes";
import {IRejectQueryThunk} from "./types";
import {actions} from "./reducers/auth";

export function createApiThunk<TArgs, TReturnType>(options:ApiThunkOptions<TArgs, TReturnType>) {
    return createAsyncThunk<TReturnType, TArgs, {rejectValue: IRejectQueryThunk}>(
        options.typePrefix,
        async (args, thunkAPI) => {
        try {
            const response = await options.apiCall((args));
            if(!response.success) {
                if(response.status === 401)
                    thunkAPI.dispatch(actions.clearCredentials())
                return thunkAPI.rejectWithValue({exception: response.exception?.text ?? null, statusCode: response.status})
            }

            return response.data!
        }
        catch (e) {
            console.log(e)
            return thunkAPI.rejectWithValue({exception: "net::ERR_CONNECTION_REFUSED", statusCode: 0})
        }
    })
}

export function createNoArgsApiThunk<TReturnType>(options:ApiThunkOptions<void, TReturnType>) {
    return createAsyncThunk<TReturnType, void, {rejectValue: IRejectQueryThunk}>(
        options.typePrefix,
        async (args, thunkAPI) => {
            try {
                const response = await options.apiCall();
                if(!response.success) {
                    if(response.status === 401)
                        thunkAPI.dispatch(actions.clearCredentials())
                    return thunkAPI.rejectWithValue({exception: response.exception?.text ?? null, statusCode: response.status})
                }

                return response.data!
            }
            catch (e) {
                return thunkAPI.rejectWithValue({exception: "net::ERR_CONNECTION_REFUSED", statusCode: 0})
            }
        })
}

type ApiThunkOptions<TArgs, TReturnType> = {
    apiCall: (args: TArgs) => Promise<IApplicationResponse<TReturnType>>,
    //args: () => TArgs,
    typePrefix: string
} | {
    apiCall: () => Promise<IApplicationResponse<TReturnType>>,
    typePrefix: string
}