import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../../api";


export const uploadLanguagesThunk = createAsyncThunk<string[], never>(
    'upload/images',
    async () => {//Api.auth;
       return ["ru", "ehhe"];
});