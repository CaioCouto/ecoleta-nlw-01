import express from 'express'
import multer from "multer"
import { celebrate, Joi } from "celebrate"

import PointsController from "./controllers/pointsController"
import ItemsController from "./controllers/itemsController"
import multerConfig from "./configs/multer"

// A função Router serve para 
// desacoplar as rotas do arquivo principal (server)
const routes = express.Router()

const uploads = multer(multerConfig)

// index (listagem), show (listar apenas 1 reg), create (criar), update (atualizar), delete (deletar)

const pointsController = new PointsController()
const itemsController = new ItemsController()

routes.get('/items', itemsController.index)
routes.get("/points", pointsController.index)
routes.get("/points/:id", pointsController.show)

routes.post(
    "/points", 
    uploads.single("image"),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required()
        }),
    },
        {
            abortEarly: false
        }
    ), 
    pointsController.create)

// Para que possa exportar routes
// para quem quer importe
export default routes