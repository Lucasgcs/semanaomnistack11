const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

/**
 * Rota / Recurso
 */

/**
 * Métodos HTTP:
 *
 * GET: Buscar / listar Uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar informação do back-end
 * DELETE: Deletar uma informação do back-end
 */

/**
 * Tipos de parâmetros
 *
 * Query Params: Parametro nomeados enviados na rota após "?"
 * geralmente servem para filtros paginação url =/users?name="Lucas"
 * acesso através de "request.query"
 *
 * Route Params: Parametros utilizaos para identificar recursos
 * na rota no código /user/:id . url = /user/20
 * acesso atráves de "request.params"
 *
 * Request Body: Corpo da requisição, utilizado para criar ou alterar
 * recursos
 * acesso através de "request.body"
 */

routes.post("/sessions", SessionController.create);
routes.get("/ongs", OngController.index);
routes.post(
  "/ongs",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.number()
        .required()
        .min(10)
        .max(11),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2)
    })
  }),
  OngController.create
);

routes.get(
  "/profile",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  ProfileController.index
);

routes.get("/incidents", IncidentController.index);
routes.post(
  "/incidents",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  }),
  IncidentController.create
);
routes.delete(
  "/incidents/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  }),
  IncidentController.delete
);
module.exports = routes;
