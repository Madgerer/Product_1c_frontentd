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
        isAttributesChecked: true,
        IsK2UChecked: true,
        isPcChecked: true,
        IsPictogramsChecked: true,
        isSiteChecked: true,
        IsTechDescriptionChecked: true
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
        },
        setTranslateCategoryChecked(state: TranslateComponentState, action: PayloadAction<boolean>) {
            state.translateCategories.IsTechDescriptionChecked = action.payload;
            state.translateCategories.isSiteChecked = action.payload;
            state.translateCategories.IsK2UChecked = action.payload;
            state.translateCategories.IsPictogramsChecked = action.payload;
            state.translateCategories.isAttributesChecked = action.payload;
            state.translateCategories.isPcChecked = action.payload;
        },
        setPcChecked(state: TranslateComponentState, action: PayloadAction<boolean>) {
            state.translateCategories.isPcChecked = action.payload;
        },
        setAttributesChecked(state: TranslateComponentState, action: PayloadAction<boolean>) {
            state.translateCategories.isAttributesChecked = action.payload;
        },
        setPictogramsChecked(state: TranslateComponentState, action: PayloadAction<boolean>) {
            state.translateCategories.IsPictogramsChecked = action.payload;
        },
        setK2UChecked(state: TranslateComponentState, action: PayloadAction<boolean>) {
            state.translateCategories.IsK2UChecked = action.payload;
        },
        setSiteChecked(state: TranslateComponentState, action: PayloadAction<boolean>) {
            state.translateCategories.isSiteChecked = action.payload;
        },
        setTechDescriptionChecked(state: TranslateComponentState, action: PayloadAction<boolean>) {
            state.translateCategories.IsTechDescriptionChecked = action.payload;
        }
    }
})

const reducer = slice.reducer;
const actions = slice.actions;

export {reducer, actions};