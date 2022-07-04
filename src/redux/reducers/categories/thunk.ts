import {createAsyncThunk} from "@reduxjs/toolkit";
import {CatalogGroup, ICategory} from "../../../domain/types";
import {IRejectQueryThunk} from "../../types";
import Api from "../../../api";
import {actions} from "./index";

export const getCategoriesThunk = createAsyncThunk<ICategory[],
    {catalogGroup: CatalogGroup, languageId: number},
    {rejectValue: IRejectQueryThunk}>(
    'categories/get-categories',
    async (args, thunkAPI) => {
        try {

            thunkAPI.dispatch(actions.setCategoriesLoading(true));

            const response = await Api.category.getCategoriesByCatalogGroups(args.catalogGroup, args.languageId);

            thunkAPI.dispatch(actions.setCategoriesLoading(false));

            if(!response.success)
                return thunkAPI.rejectWithValue({exception: response.exception?.text ?? null, statusCode: response.status})


            return response.data!;
        } catch (e) {
            return thunkAPI.rejectWithValue({exception: "net::ERR_CONNECTION_REFUSED", statusCode: 0})
        }
    }
)