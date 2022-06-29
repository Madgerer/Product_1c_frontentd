import {createAsyncThunk, Dispatch} from "@reduxjs/toolkit";
import Api from "../../../../api";
import {hashPassword} from "../../../../utils/passwordHasher";
import {actions} from "./index";
import {actions as authActions} from "../../auth";

export const loginThunk = createAsyncThunk<string,
            {username: string, password:string },
            {rejectValue: { exception: string | null, statusCode: number }}>(
    'auth/login',
    async (args, thunkAPI) => {

        thunkAPI.dispatch(actions.setLoading(true));

        const passwordHash = hashPassword(args.password);
        try {
            const response = await Api.auth.login(args.username, passwordHash);
            if(!response.success)
                return thunkAPI.rejectWithValue({exception: response.exception?.text ?? null, statusCode: response.status})

            thunkAPI.dispatch(actions.setLoading(false))
            thunkAPI.dispatch(authActions.setCredentials({username: args.username, token: response.data!}))
            thunkAPI.dispatch(actions.clearAfterLogin())

            return response.data!
        } catch (e) {
            return thunkAPI.rejectWithValue({exception: "net::ERR_CONNECTION_REFUSED", statusCode: 0})
        }
    });
