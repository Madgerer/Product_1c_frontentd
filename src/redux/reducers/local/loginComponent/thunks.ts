import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../../../api";
import {hashPassword} from "../../../../utils/passwordHasher";
import {actions} from "./index";
import {actions as authActions} from "../../auth";
import {IRejectQueryThunk} from "../../../types";


export const loginThunk = createAsyncThunk<Function,
            {username: string, password:string, redirectCallBack: Function },
            {rejectValue: IRejectQueryThunk}>(
    'auth/login',
    async (args, thunkAPI) => {

        thunkAPI.dispatch(actions.setLoading(true));

        const passwordHash = hashPassword(args.password);
        try {
            const response = await Api.auth.login({username: args.username, password: passwordHash});
            thunkAPI.dispatch(actions.setLoading(false))

            if(!response.success)
                return thunkAPI.rejectWithValue({exception: response.exception?.text ?? null, statusCode: response.status})

            thunkAPI.dispatch(authActions.setCredentials({username: args.username, token: response.data!}))
            thunkAPI.dispatch(actions.clearAfterLogin())

            return args.redirectCallBack;
        } catch (e) {
            return thunkAPI.rejectWithValue({exception: "net::ERR_CONNECTION_REFUSED", statusCode: 0})
        }
    });
