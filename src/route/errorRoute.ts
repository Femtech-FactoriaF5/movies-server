import Router, { NextFunction, Request, Response } from "express";


const router = Router();

router.all('/',(req: Request, res: Response, next: NextFunction) => res.status(404).json({"error":"No existe la ruta"}));

export default router;