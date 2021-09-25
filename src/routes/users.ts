import { Router } from 'express';

import { register, login, updateUser, getUser } from '../services/user';

export const users = Router();

users

    .post('register', async (req, res) => {
        const result = await register(req.body);
        res.send(result);
    })

    .post('login', async (req, res) => {
        const result = await login(req.body);
        res.send(result);
    })

    .patch('', async (req, res) => {
        const result = await updateUser(req.user.id, req.body);
        res.send(result);
    })

    .get('', async (req, res) => {
        const result = await getUser(req.user.id);
        res.send(result);
    })