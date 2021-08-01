import express from 'express';
import path from 'path';

const app = express();

app.use(express.static('./dist/'));

app.get('/', (_, res) => {
	res.render('dist/index.html');
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

app.listen(3000);
