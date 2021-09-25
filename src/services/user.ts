import * as jwt from 'jsonwebtoken';
import { hash } from 'bcrypt';


import {
    LoginBody,
    RegisterBody,
    LoginResponse,
    ErrorMessageEnum,
} from './../constants/types';
import {
    updateValidation,
    getUserValidation,
    registerOrLoginValidation,
} from './validation';
import { User, UserAttributes } from "../models/user";
import { throwErrorIf } from '../utils/helpers';
import env from '../constants/env';


export const register = async(
    userBody: RegisterBody
    ): Promise<UserAttributes> => {

    const { error } = registerOrLoginValidation(userBody);
    throwErrorIf(!!error, error.details[0].message as any);

    const isExistUser = await User.findOne({
        where: { email: userBody.email }
    });

    throwErrorIf(
        !(!!isExistUser?._attributes?.id),
        ErrorMessageEnum.Not_Allowed_Email
    );
    
    userBody.password = await hash(userBody.password, 10);
    const user = await User.create(userBody);
    
    return user._attributes;
};


export const login = async(
    userBody: LoginBody
    ): Promise<LoginResponse> => {

    const { error } = registerOrLoginValidation(userBody);
    throwErrorIf(!!error, error.details[0].message as any);

    userBody.password = await hash(userBody.password, 10);

    const user = await User.findOne({
        where: { ...userBody }
    });

    throwErrorIf(
        !user?._attributes?.id,
        ErrorMessageEnum.Error_In_Login_Data
    );

    const token = await jwt.sign(userBody.password, env.SECRET);

    return { ...user._attributes, token };
};

export const getUser = async(
    userId: number
    ): Promise<UserAttributes> => {

    const { error } = getUserValidation({userId});
    throwErrorIf(!!error, error.details[0].message as any);

    const user = await User.findByPk(userId);

    throwErrorIf(
        !(!!user?._attributes?.id),
        ErrorMessageEnum.UNAUZENTICATED
    );
    
    return user._attributes;
};

export const updateUser = async(
    userId: number,
    body: any
    ): Promise<UserAttributes> => {

    const { error } = updateValidation({ userId, ...body });
    throwErrorIf(!!error, error.details[0].message as any);

    let user = await User.findOne({
        where: { id: userId }
    });

    throwErrorIf(
        !(!!user?._attributes?.id),
        ErrorMessageEnum.UNAUZENTICATED
    );

    if(body.password){
        body.password = await hash(body.password, 10);
    }

    user = await user.update({ ...body });

    return user._attributes;
};