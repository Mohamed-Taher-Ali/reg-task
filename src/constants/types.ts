import { UserAttributes } from './../models/user';


export enum ErrorMessageEnum {
    UNAUTHORIZED = 'UNAUTHORIZED',
    UNAUZENTICATED = 'UNAUZENTICATED',
    Error_In_Login_Data = 'Error_In_Login_Data',
    Not_Allowed_Email = 'Not_Allowed_Email',
};

export interface TokenPayload {
    id: number
}

export interface RegisterBody {
    email: string;
    password: string;
}

export interface LoginBody {
    email: string;
    password: string;
}

export interface LoginResponse extends UserAttributes {
    token: string;
}