import express from 'express';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({path: __dirname + '/.env'});

const app = express();

app.use(express.static('./dist/'));

app.get('/', (_, res) => {
	res.render('dist/app.html');
});
app.get('/main', (_, res) => {
	res.render('dist/index.html');
});
app.get('/signin', (_, res) => {
	res.render('dist/signin.html');
});
app.get('/signup', (_, res) => {
	res.render('dist/signup.html');
});
app.use('*', (_, res) => {
	res.sendFile(path.join(__dirname, '/dist/404.html'));
});

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
	console.log(`Сервер запущен на порте ${port}`);
});
