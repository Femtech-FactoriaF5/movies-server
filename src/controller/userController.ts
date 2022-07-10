import { Request, Response } from 'express';
import { userDAO, User } from '../model/user';
import jwt from '../middleware/authentication/jwtHandler';

export const userController = {
    saveUser: async (req: Request, res: Response) => {

        try {
            const { email, password, ...user } = req.body as User;
            if (!email || !password) {
                res.status(400).send('email or password missing');
            } else {
                const result = await userDAO.saveUser({ email, password, ...user });

                result
                    ? res.status(201).json({ userId: result.insertedId.toString() })
                    : res.status(500).send("Failed to create a new user.");
            }
        } catch (error: any) {

            res.status(400).send(error.message);
        }
    },
    login: async (req: Request, res: Response) => {
        const token:any = await jwt.generateToken(req.body.email)
        console.log(token);

        res.json({token});

    },
    getAllUsers: async (req: Request, res: Response) => {
        try {
            const result = await userDAO.getUsers();

            result
                ? res.status(201).json(result)
                : res.status(500).send("Failed to get data.");

        } catch (error: any) {

            res.status(400).send(error.message);
        }
    },
    Auth: async (req: Request, res: Response) => {
        res.json({
            token: req.user
        })
    }
}

