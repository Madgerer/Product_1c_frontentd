import {createAsyncThunk} from "@reduxjs/toolkit";
import {CatalogGroup, ICardDistributionType, IProductGroupBasic, IProductGroupIdentity} from "../../../../domain/types";
import {IRejectQueryThunk} from "../../../types";
import {actions} from "../productComponent/productGroupList";
import Api from "../../../../api";

export const getProductsGroupsBasicThunk = createAsyncThunk<IProductGroupBasic[],
    {   languageId: number,
        searchString: string,
        catalogGroup: number,
        validationType: number,
        catalogId: number,
        categoryId: number },
    {rejectValue: IRejectQueryThunk}>(
    'tree-page/get-product-groups',
    async (args, thunkAPI) => {
        try {

            thunkAPI.dispatch(actions.setLoading(true));
            const catalogId = args.catalogGroup === CatalogGroup.Printed ? args.catalogId : null;
            const response = await Api.productGroups.getProductsGroupsByCategory(args.languageId,
                args.searchString,
                args.catalogGroup,
                args.validationType,
                catalogId,
                args.categoryId);

            thunkAPI.dispatch(actions.setLoading(false));

            if(!response.success)
                return thunkAPI.rejectWithValue({exception: response.exception?.text ?? null, statusCode: response.status})

            return response.data!;
        } catch (e) {
            return thunkAPI.rejectWithValue({exception: "net::ERR_CONNECTION_REFUSED", statusCode: 0})
        }
    });