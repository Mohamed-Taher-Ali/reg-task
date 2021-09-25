import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

import { ErrorMessageEnum, TokenPayload } from './../constants/types';


export const throwErrorIf = (
    condition: boolean,
    message: ErrorMessageEnum
) => { if (condition) throw Error(message); }

export const getPayloadFromToken = async (req: Request): Promise<TokenPayload> => {
    const
        token = req.headers.authorization,
        jwtPayload = await jwt.decode(token, { complete: true }),
        payload = jwtPayload.payload as TokenPayload;

    throwErrorIf(!payload.id, ErrorMessageEnum.UNAUZENTICATED);

    return payload;
}

export const logError = (e) => `error: (${e}) & date: (${new Date()})`;
