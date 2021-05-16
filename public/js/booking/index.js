import Api from './api.js';
import Session from './session.js';

document.addEventListener('DOMContentLoaded', async () => {
	Session().init();
	//API
	await Api.init();
});
