import { Router, type Request, type Response } from "express"
import { agenciaController } from "./controller.ts"

const agenciaRouter = Router()

agenciaRouter.get("/", agenciaController.listar)

agenciaRouter.get("/:id", agenciaController.buscarPorId)

export default agenciaRouter