import { agenciaRepository } from "./repository.ts";

export const agenciaService = {

    listar: () => agenciaRepository.listar(),
    
    async buscarPorId(id: string) {
        const agencia = await agenciaRepository.buscarPorId(id)

        if(!agencia) throw new Error("AGENCIA NÃO ENCONTRADA")

        return agencia
    }
}