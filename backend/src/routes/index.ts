import express from 'express';

import get_cors from '@mylibs/express_cors';
import singin from "./signin"
import getAdmins from "./get-admins"
import postAdmin from "./post-admin"
import newPassword from "./new-password"

import cors from 'cors';
import auth from "@mylibs/express_auth"
import { tryCatcher } from '@mylibs/express_errors';

const router = express.Router();

router.use(cors(get_cors(process.env.ADMIN_ORIGIN)))

router.post('/singin', tryCatcher(singin))
router.get("/admins", auth(), tryCatcher(getAdmins))
router.post("/admin", auth(), tryCatcher(postAdmin))
router.post("/new-password", auth(), tryCatcher(newPassword))

export default router
