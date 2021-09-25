import { Express } from 'express-serve-static-core';

import { users } from './users';


const routes = {
    users,
};

export const appRouter = (app: Express) => {
    Object.entries(routes).map(([name, router]) => {
        app.use(`/api/${name}`, router);
    })
};