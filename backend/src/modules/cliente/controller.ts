import { type Request, type Response } from "express";
import { clienteService } from "./service.ts";

export const clienteController = {

    async listar (req: Request, res: Response){
        const clientes = await clienteService.listar()
        res.status(200).json(clientes)
    },

    async buscarPorId (req: Request, res: Response) {
        try {
            const id = String(req.params.id)
            const clientes = await clienteService.buscarPorId(id)
            res.status(200).json(clientes)
        } catch (error) {
            res.status(404).json({ message: "CLIENTE NÃO ENCONTRADO" })
            console.error(error)
        }
    }
}