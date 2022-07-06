import {ILanguage} from "../../../../domain/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {act} from "react-dom/test-utils";

export type TranslateComponentState = {
    phraseType: PhraseTypes,
    translateCategories: ITranslateCategory,
    selectedLanguage: ILanguage,
}

export enum PhraseTypes {
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
        setPhaseType(state: TranslateComponentState, action: PayloadAction<PhraseTypes>) {
            if(state.phraseType === action.payload)
                state.phraseType = PhraseTypes.Nothing
            else
                state.phraseType = action.payload
        },
        setLanguage(state: TranslateComponentState, action: PayloadAction<ILanguage | undefined>) {
            if(action.payload !== undefined)
                state.selectedLanguage = action.payload
        }
    }
})

const reducer = slice.reducer;
const actions = slice.actions;

export {reducer, actions};