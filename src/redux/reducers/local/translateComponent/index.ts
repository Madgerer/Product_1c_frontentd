import {ILanguage} from "../../../../domain/types";
import {createSlice} from "@reduxjs/toolkit";

export type TranslateComponentState = {
    phraseType: PhraseTypes,
    translateCategories: ITranslateCategory,
    selectedLanguage: ILanguage,
}

enum PhraseTypes {
    Nothing,
    All,
    NotTranslated
}

interface ITranslateCategory {
    isPcChecked: boolean,
    isSiteChecked: boolean,
    isAttributesChecked: boolean,
    IsPictogramsChecked: boolean,
    IsTechDescriptionChecked: boolean,
    IsK2UChecked: boolean
}

const INITIAL_STATE: TranslateComponentState = {
    phraseType: PhraseTypes.Nothing,
    selectedLanguage: {id: 11, name: "Русский"},
    translateCategories: {
        isAttributesChecked: false,
        IsK2UChecked: false,
        isPcChecked: false,
        IsPictogramsChecked: false,
        isSiteChecked: false,
        IsTechDescriptionChecked: false
    }
}

const slice = createSlice({
    name: "translate-page",
    initialState: INITIAL_STATE,
    reducers: {

    }
})

const reducer = slice.reducer;
const actions = slice.actions;

export {reducer, actions};