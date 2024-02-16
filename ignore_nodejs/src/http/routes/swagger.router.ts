import swaggerUi from "swagger-ui-express";
import fs from 'fs';

import { Router } from "express";

const router = Router()

/* Swagger files start */
const swaggerFile = (process.cwd()+"/src/docs/api.spec.json");
const swaggerData = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default router