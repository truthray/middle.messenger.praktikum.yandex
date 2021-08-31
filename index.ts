import express from 'express';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({path: __dirname + '/.env'});

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use('*', (_, res) => {
	res.sendFile(path.join(__dirname, 'dist/app.html'));
});

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
	console.log(`Сервер запущен на порте ${port}`);
});
