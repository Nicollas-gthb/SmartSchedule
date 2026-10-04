import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Express!');
});

const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});