import {createAsyncThunk} from "@reduxjs/toolkit";

export const uploadPriceGroups = createAsyncThunk<string[], never>(
    'upload/images',
    async () => {//Api.auth;
        return ["ru", "ehhe"];
    });