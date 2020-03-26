const express = require("express");

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
routes.post("/ongs", OngController.create);

routes.get("/profile", ProfileController.index);

routes.get("/incidents", IncidentController.index);
routes.post("/incidents", IncidentController.create);
routes.delete("/incidents/:id", IncidentController.delete);
module.exports = routes;
