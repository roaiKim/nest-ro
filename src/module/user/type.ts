export interface RoResponse<T> {
    code: number;
    message: string;
    data: T
}

export interface UserGetUserResponse {
    name: string;
}

export interface UserGetUserRequest {
    name: string;
    password: string;
}
