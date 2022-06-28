import {createAsyncThunk} from "@reduxjs/toolkit";
import {IThunkExtraParam} from "../../../app/App";
import {actions} from "./index";
import {IQueryException} from "../../../api/baseTypes";

interface ILoginThunkRes {
    token: string | null,
    username: string | null,
    error: boolean,
    exception: IQueryException | null
}

export const loginThunk = createAsyncThunk<ILoginThunkRes, { username: string, password:string }, { extra: IThunkExtraParam }>(
    'auth/login',
    async (arg, thunkAPI) => {
        const res = await thunkAPI.extra.api.auth.login(arg.username, arg.password);
        if(!res.success) {
            const errRes: ILoginThunkRes = {
                error: true,
                exception: res.exception,
                token: null,
                username: null
            }
            thunkAPI.rejectWithValue(errRes)
        }

        return {
            token: res.data,
            username: arg.username,
            error: false,
            exception: null
        };
    }
)