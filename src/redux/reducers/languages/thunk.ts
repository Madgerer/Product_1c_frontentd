import {createAsyncThunk, Dispatch} from "@reduxjs/toolkit";
import Api from "../../../api";
import {ILanguage} from "./types";
import {actions} from "./index";


export const uploadLanguagesThunk = createAsyncThunk<ILanguage[], void, {dispatch: Dispatch} >(
    'upload/languages',
    async (_, thunkAPI) => {
       try {
              const response = await Api.translate.getLanguages();
              if(response.success) {
                     thunkAPI.dispatch(actions.setLanguagesList(response.data!))
                     return response.data!;
              }
              else {
                     alert("Error while loading languages, use default. " +
                         `Status code: ${response.status}. Text: ${response.exception}`)
              }
       }
       catch (e) {
              alert(`Unpredictable error. Text: ${e}`)
       }
       return [];
    });