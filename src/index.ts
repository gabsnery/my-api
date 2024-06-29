import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import itemsRouter from './item/item.controller'
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('combined', { stream: accessLogStream }))

// Middlewares
app.use(express.json());

// Rota de exemplo
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Tratamento de erros
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});


app.use('/item', itemsRouter);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
