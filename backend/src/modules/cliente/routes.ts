import { Router, type Request, type Response } from "express";
import { clienteController } from "./controller.ts";

const clienteRouter = Router()

clienteRouter.get("/", clienteController.listar)

clienteRouter.get("/:id", clienteController.buscarPorId)

export default clienteRouter