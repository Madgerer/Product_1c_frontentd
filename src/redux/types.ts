export interface IRejectQueryThunk {
    exception: string | null,
    statusCode: number
}

export interface ILoadingModel {
    isLoading: boolean
}