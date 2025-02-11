const Router = require('express').Router();

const { access, getVisits, getProgress, updateProgress, countUsers } = require('../controllers/mainController');

Router.post('/access', access);
Router.get('/get-visits', getVisits);
Router.get('/get-progress/:userId', getProgress);
Router.post('/update-progress', updateProgress);
Router.get('/count', countUsers);

module.exports = Router;
