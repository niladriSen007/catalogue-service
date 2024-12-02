import { NextFunction, Response } from 'express';
import createHttpError from 'http-errors';
import { AuthRequest } from '../common/types';


export const isValidRoleMiddleware = (roles: string[] = []) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const { roles: currentUserRoles } = req.auth;
                console.log('USER ROLES', req?.auth);
                console.log('USER ROLES --- ', roles);
         if (!currentUserRoles?.length) {
            return res.status(403).json({
                message: 'User is not authorized roles to do the action',
            });
        }
        if (roles?.some((role) => role === currentUserRoles)) {
            next();
        } else {
            next(
                createHttpError(
                    403,
                    'User is not authorized roles to do the action',
                ),
            );
        }
    };
};
