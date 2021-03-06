export type ActionType = 'post' | 'get' | 'delete' | 'put';

export interface IApplicationResponse<T> {
    data: T | null;
    status: number;
    success: boolean;
    exception: IQueryException | null;
}

export interface IQueryException {
    text: string
}

export interface IActionTypes {
    post: ActionType;
    get: ActionType;
    delete: ActionType;
    put: ActionType;
}

const actionTypes: IActionTypes = {
    post: 'post',
    get: 'get',
    delete: 'delete',
    put: 'put',
};

export default actionTypes;
