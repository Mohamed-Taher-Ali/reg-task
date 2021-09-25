import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user';
import * as fs from 'fs';

import { ErrorMessageEnum, RoleEnum } from './../constants/types';
import { throwErrorIf, getPayloadFromToken, logError } from './helpers';


export const authGuard = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    const payload = getPayloadFromToken(req);

    req.user.id = (await payload).id;

    next();
}

export const roleGuard = (...roles: RoleEnum[]) => async (
    req: any,
    res: Response,
    next: NextFunction
) => {

    const
        payload = await getPayloadFromToken(req),
        user = await User.findOne({ where: { id: payload.id } });

    req.user.id = (await payload).id;

    throwErrorIf(
        !roles.includes(user._attributes.role),
        ErrorMessageEnum.UNAUTHORIZED
    );

    next();
}

export const errorHandler = (
    err: any,
    req: any,
    res: Response,
    next: NextFunction
) => {

    if (!err) return next();

    try {
        fs.appendFileSync('../constants/err.log', logError(err));
    } catch (err2) {
        fs.appendFileSync('../constants/err.log',
        `
        ${logError(err)}
        ${logError(err2)}
        `
        );
    }
}