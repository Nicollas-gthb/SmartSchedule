export type Cliente = {
    id: string,
    nome: string,
    idade: string,
    sexo: string,
    email: string
}

const clientes: Cliente[] = [
    { id: "1" , nome: "Fulano", idade: "32", sexo: "M", email: "@email.com" },
    { id: "2" , nome: "Ciclana", idade: "45", sexo: "F", email: "@email.com" }
]

export const clienteRepository = {
    listar: async (): Promise<Cliente[]> => clientes,
    buscarPorId: async (id: string): Promise<Cliente | undefined > => clientes.find((a) => a.id === id)
}
