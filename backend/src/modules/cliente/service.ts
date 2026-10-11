import { clienteRepository } from "./repository.ts"

export const clienteService = {
    listar: () => clienteRepository.listar(),

    async buscarPorId(id: string){
        const cliente = await clienteRepository.buscarPorId(id)

        if(!cliente) throw new Error("CLIENTE NÃO ENCONTRADO")

        return cliente
    }
}