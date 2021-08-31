import './common.scss';
import {Router} from './common/router';
import Index from './pages/index';
import Err404 from './pages/404';
import Signin from './pages/signin';
import Signup from './pages/signup';

window.onload = () => {
	new Router()
		.use('/', Index)
		.use('/signin', Signin)
		.use('/signup', Signup)
		.use('/404', Err404)
		.onNotFound(Err404)
		.start();
};
