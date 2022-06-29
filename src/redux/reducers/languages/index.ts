import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LocalStorageProvider} from "../../../api/LocalStorageProvider";
import {ILanguage} from "./types";

export type LanguageState = {
    languages: ILanguage[]
    selectedLanguage: ILanguage
};


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
        setLanguagesList(state: LanguageState, action: PayloadAction<ILanguage[]>){
            state.languages = action.payload;
            return state;
        }
    },
})

const reducer = languageSlice.reducer;
const actions = languageSlice.actions;

export {reducer, actions};