import {createAsyncThunk} from "@reduxjs/toolkit";
import {CatalogGroup, ICategory} from "../../../domain/types";
import {IRejectQueryThunk} from "../../types";
import Api from "../../../api";
import {actions} from "./index";
import {createApiThunk} from "../../createApiThunk";

export const getCategoriesThunk = createApiThunk({
    typePrefix: "get/categories",
    apiCall: Api.category.getCategoriesByCatalogGroups
})