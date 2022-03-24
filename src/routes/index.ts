import express, { Router } from 'express';
import { ApiController } from './api.route';

const router: Router = express.Router();
const apiController: ApiController = new ApiController();

router.post("/resources", async (
    request: express.Request,
    response: express.Response
) => await apiController.createResource(
    request,
    response
));

router.get("/resources", async (
    request: express.Request,
    response: express.Response
) => await apiController.getResources(
    request,
    response
));

router.post("/resources/link", async (
    request: express.Request,
    response: express.Response
) => await apiController.createResourceLink(
    request,
    response
));

router.get("/resources/:id", async (
    request: express.Request,
    response: express.Response
) => await apiController.getResource(
    request,
    response
));

export { router };