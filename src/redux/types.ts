export interface IRejectQueryThunk {
    exception: string | null,
    statusCode: number
}

export interface ILoadingModel {
    isLoading: boolean
}

export interface IMountableProps {
    onMount: () => {}
}

export interface ISelectable {
    selected: boolean
}

export interface ISelectableIndexModel<T> {
    selected: boolean,
    index: number,
    model: T[]
}