import {IProductBase, IProductIdentity} from "../../../../../domain/types";
import {ISelectable} from "../../../../types";

export type GroupRecommendation = IProductBase & ISelectable

export type AdditionalInfoState = {
    allRecommendations: IProductIdentity[],
    selectedRecommendation: IProductIdentity | null,

    groupRecommendations: GroupRecommendation [],
    selectedGroupRecommendation: GroupRecommendation | null,
}