import {Action, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AlphabeticalAndNumericRestrictionsAllStr} from "../../../../utils/regexpUtlis";
import {loginThunk} from "./thunks";

export type LoginComponentState = {
    username: string,
    password: string,
    isLoading: boolean,
    usernameInputStatus: InputStatus,
    passwordInputStatus: InputStatus,
    errorText: string | null,
    isLoginDisabled: boolean
}


export enum InputStatus {
    AllOkay = "All okay",
    RestrictedSymbolsNotAllowed = "Use only alphabetical and numerical characters",
    LengthNotOkay = "Length not okay",
    Empty = ""
}

const INITIAL_STATE: LoginComponentState = {
    username: "",
    password: "",
    errorText: null,
    isLoading: false,
    passwordInputStatus: InputStatus.Empty,
    usernameInputStatus: InputStatus.Empty,
    isLoginDisabled: true
}

const loginComponentSlice = createSlice({
    name: "loginPage",
    initialState: INITIAL_STATE,
    reducers: {
        setLoading(state: LoginComponentState, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
            return state;
        },
        passwordChanged(state: LoginComponentState, action: PayloadAction<string>) {
            state.password = action.payload
            const status = getInputStatus(action.payload, 3, 20);
            if(status !== InputStatus.AllOkay)
                state.isLoginDisabled = true;
            else {
                if(state.usernameInputStatus === InputStatus.AllOkay && state.isLoginDisabled)
                    state.isLoginDisabled = false;
            }
            state.passwordInputStatus = status;
            return state;
        },
        usernameChanged(state: LoginComponentState, action: PayloadAction<string>) {
            state.username = action.payload
            const status = getInputStatus(action.payload, 3, 20);
            if(status !== InputStatus.AllOkay)
                state.isLoginDisabled = true;
            else {
                if(state.passwordInputStatus === InputStatus.AllOkay && state.isLoginDisabled)
                    state.isLoginDisabled = false;
            }
            state.usernameInputStatus = status;
            return state;
        },
        clearAfterLogin(state: LoginComponentState, action: Action) {
            state.password = "";
            state.username = "";
            state.usernameInputStatus = InputStatus.Empty;
            state.passwordInputStatus = InputStatus.Empty;
            state.isLoginDisabled = true;
            state.errorText = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            action.payload();
        })
        builder.addCase(loginThunk.rejected, (state, action) => {
            state.errorText = `Can't login. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`
        })
    }
});

const actions = loginComponentSlice.actions;
const reducer = loginComponentSlice.reducer;

export {actions, reducer}

const regexp = AlphabeticalAndNumericRestrictionsAllStr();

const getInputStatus = (str: string, minLength: number, maxLength: number): InputStatus => {
    const noRestricted = regexp.test(str);
    if(!noRestricted)
        return InputStatus.RestrictedSymbolsNotAllowed;
    if(str.length >= minLength && str.length <= maxLength)
        return InputStatus.AllOkay;
    return InputStatus.LengthNotOkay;
}
