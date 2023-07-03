import mongoose from 'mongoose';
import { App } from 'types/app';
import { CustomExpress } from 'types/custom_express';
import { SHA256 } from "sha2"
import { UnauthorizedOperation } from '@mylibs/express_errors';

const ObjectId = mongoose.Types.ObjectId

async function handler(req: CustomExpress.Req, res: CustomExpress.Res) {
    let { currentPassword, newPassword } = req.body

    const Admins = mongoose.model<App.Admin>("admins")
    const admin = await Admins.findById(req.user.id)

    if (admin.password != SHA256(currentPassword).toString("hex")) {
        throw new UnauthorizedOperation("Senha atual está incorreta");
    }

    admin.password = SHA256(newPassword).toString("hex")

    await admin.save()

    res.status(200).json({ success: true })
}

export default handler;