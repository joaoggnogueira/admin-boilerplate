import mongoose from 'mongoose';
import { App } from 'types/app';
import { CustomExpress } from 'types/custom_express';

async function handler(req: CustomExpress.Req, res: CustomExpress.Res) {
    let { from, to, search } = req.query as any as { from: number, to: number, search: string }

    const Admins = mongoose.model<App.Admin>("admins")
    if (search) {
        search = search.replace(/(\.|\-|\_|\?|\*|\)|\(|\[|\]|\^|\$|\@|\!|\||\\|\/)/g, "").trim()
    }
    let admins: App.Admin = await Admins.find({ ...(search ? { $or: [{ email: { $regex: search, $options: 'i' } }, { name: { $regex: search, $options: 'i' } }] } : {}) }, "-password").skip(from).limit(to - from).lean()

    res.status(200).json(admins)
}

export default handler;