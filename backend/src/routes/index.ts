import express from 'express';

import get_cors from '@mylibs/express_cors';
import singin from "./signin"
import cors from 'cors';
import { tryCatcher } from '@mylibs/express_errors';

const router = express.Router();

router.use(cors(get_cors(process.env.ADMIN_ORIGIN)))

router.post('/singin', tryCatcher(singin))

export default router
