import jwt from "jsonwebtoken"
import { NotAcceptableError, UnauthorizedOperation } from '@mylibs/express_errors';
import mongoose from 'mongoose';
import { App } from 'types/app';
import { CustomExpress } from 'types/custom_express';
import { SHA256 } from "sha2"

async function handler(req: CustomExpress.Req, res: CustomExpress.Res) {
    const { email, password } = req.body as any;

    const Admins = mongoose.model<App.Admin>("admins")

    let user: App.Admin = await Admins.findOne({ email }).lean()

    if (!user) {
        throw new NotAcceptableError("Email errado")
    }

    if (user && user.deleted) {
        throw new UnauthorizedOperation("Sua conta foi desativada")
    }

    if (SHA256(password).toString("hex") != user.password) {
        throw new NotAcceptableError("Senha errada")
    }

    const session_token = jwt.sign({ email, id: user._id, date: Date.now() }, process.env.JWT_SECRET_TOKEN + 'admintemplatesha2023', {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
    })

    res.status(200).send({ session_token })
}

export default handler;