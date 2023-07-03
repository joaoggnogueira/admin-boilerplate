import { BadRequestError, UnauthorizedOperation } from '@mylibs/express_errors';
import mongoose from 'mongoose';
import { App } from 'types/app';
import { SHA256 } from "sha2"
import { CustomExpress } from 'types/custom_express';
const ObjectId = mongoose.Types.ObjectId

async function handler(req: CustomExpress.Req, res: CustomExpress.Res) {
    if (!req.user.super) {
        throw new UnauthorizedOperation("Você não possui credenciais para criar ou editar outros administradores")
    }
    const form: Pick<App.Admin, '_id' | 'deleted' | 'email' | 'name' | 'password' | 'super'> = req.body

    console.log(form)
    const Admins = mongoose.model<App.Admin>("admins")
    let admin = null;

    if (form._id) {
        admin = await Admins.updateOne({ _id: new ObjectId(form._id) }, { $set: { deleted: form.deleted, password: SHA256(form.password).toString("hex") } }, { new: true })
    } else {
        if (!form.email || form.email.indexOf("@") != -1) {
            throw new BadRequestError("Campo de email inválido")
        }
        if (!form.name || form.name.length < 4) {
            throw new BadRequestError("Campo de nome precisa de ao menos 10 letras")
        }
        if (!form.password || form.password.length < 10) {
            throw new BadRequestError("Campo de senha não pode ter menos de 10 letras")
        }
        admin = await Admins.create({ created: new Date(), deleted: false, email: form.email, name: form.name, password: SHA256(form.password).toString("hex"), super: form.super })
    }

    res.status(200).json({ success: true })
}

export default handler;