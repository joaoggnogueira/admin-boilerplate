import { AuthError } from "./express_errors"
import { CustomExpress } from 'types/custom_express';
import jwt from "jsonwebtoken"

export default function () {
    return function handler(req: CustomExpress.Req, res: CustomExpress.Res, next: Function) {
        const token_header = req.headers.authorization

        if (!token_header) return next(new AuthError("Token requerido"))

        jwt.verify(token_header, process.env.JWT_SECRET_TOKEN, async (err, decoded) => {
            try {
                if (err) throw new AuthError("Token inválido")
                req.user = decoded as { id: string, email: string, access_token: string };
                return next()
            } catch (err) {
                next(err)
            }
        })
    }
}