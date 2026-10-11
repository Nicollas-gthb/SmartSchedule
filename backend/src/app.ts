import express, { type Express, type Request, type Response } from 'express';
import cors from "cors"

const app: Express = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/health', (req: Request, res: Response) => {
    res.json({status: "ok"});
});


//===================== ROTAS API ===================


import { agenciaRouter } from './modules/agencia/index.ts';
import { clienteRouter } from './modules/cliente/index.ts'

app.use("/api/v1/agencia", agenciaRouter)
app.use("/api/v1/cliente", clienteRouter)

export default app