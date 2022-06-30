import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LocalStorageProvider} from "../../../api/LocalStorageProvider";
import {ILanguage} from "./types";
import {uploadLanguagesThunk} from "./thunk";


export interface LanguageState {
    languages: ILanguage[]
    selectedLanguage: ILanguage,
}

const INITIAL_STATE: LanguageState = {
    languages: [{id: 11, name: "Русский"}],
    selectedLanguage: LocalStorageProvider.getLanguage() ?? {
        id: 11,
        name: "Русский"
    }
}

const languageSlice = createSlice({
    name: "languages",
    initialState: INITIAL_STATE,
    reducers: {
        setSelected(state: LanguageState, action: PayloadAction<number>){
            state.selectedLanguage = state.languages.find(x => x.id === action.payload) ?? state.selectedLanguage;
            LocalStorageProvider.setLanguage(state.selectedLanguage)
            return state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(uploadLanguagesThunk.fulfilled, (state, {payload}) => {
            state.languages = payload
        })
        builder.addCase(uploadLanguagesThunk.rejected, (state, action) => {
            console.error(`Cant download language list: Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const reducer = languageSlice.reducer;
const actions = languageSlice.actions;
const caseReduces = languageSlice.caseReducers;

export {reducer, actions, caseReduces};