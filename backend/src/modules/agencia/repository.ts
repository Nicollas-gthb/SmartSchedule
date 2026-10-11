export type Agencia = {
    id: string,
    nome: string,
    endereco: string
}

const agencias: Agencia[] = [
    { id: "1", nome: "agencia norte", endereco: "av. A, 100" },
    { id: "2", nome: "agencia sul", endereco: "r. B, 200" },
]

export const agenciaRepository = {
    listar: async (): Promise<Agencia[]> => agencias,
    buscarPorId: async (id: string): Promise<Agencia | undefined> => agencias.find((a) => a.id === id)
}