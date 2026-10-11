import { type Request, type Response } from "express"
import { agenciaService } from "./service.ts"

export const agenciaController = {

    async listar (req: Request, res: Response) {
        const agencias = await agenciaService.listar()
        res.status(200).json(agencias)
    },

    async buscarPorId (req: Request, res: Response) {
        try {
            const id = String(req.params.id)
            const agencia = await agenciaService.buscarPorId(id)
            res.status(200).json(agencia)
        } catch (error) {
            res.status(404).json({message: "AGENCIA NÃO ENCONTRADA"})
            console.error(error)
        }
    }
}