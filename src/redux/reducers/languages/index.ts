import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LocalStorageProvider} from "../../../api/LocalStorageProvider";
import {getLanguagesThunk} from "./thunk";
import {ILanguage} from "../../../domain/types";


export interface LanguageState {
    languages: ILanguage[]
    selected: ILanguage,
}

const INITIAL_STATE: LanguageState = {
    languages: [{id: 11, name: "Русский"}],
    selected: LocalStorageProvider.getLanguage() ?? {
        id: 11,
        name: "Русский"
    }
}

const languageSlice = createSlice({
    name: "languages",
    initialState: INITIAL_STATE,
    reducers: {
        setSelected(state: LanguageState, action: PayloadAction<number>){
            state.selected = state.languages.find(x => x.id === action.payload) ?? state.selected;
            LocalStorageProvider.setLanguage(state.selected)
            return state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getLanguagesThunk.fulfilled, (state, {payload}) => {
            state.languages = payload
        })
        builder.addCase(getLanguagesThunk.rejected, (state, action) => {
            console.error(`Cant download language list: Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const reducer = languageSlice.reducer;
const actions = languageSlice.actions;
const caseReduces = languageSlice.caseReducers;

export {reducer, actions, caseReduces};