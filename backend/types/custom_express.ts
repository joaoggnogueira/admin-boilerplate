import { Request, Response } from 'express';

export namespace CustomExpress {
    export interface Req extends Request {
        user: { id: string, email: string, access_token?: string }
        files?: { mimetype: string, buffer: string | Buffer, originalname: string }[]
    }

    export interface Res extends Response {
    }
}