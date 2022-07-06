import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../../api";
import {IRejectQueryThunk} from "../../types";
import {ILanguage} from "../../../domain/types";
import {createNoArgsApiThunk} from "../../createApiThunk";

export const getLanguagesThunk = createNoArgsApiThunk({
    typePrefix: "get/languages",
    apiCall: Api.translate.getLanguages
})