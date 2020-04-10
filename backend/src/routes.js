const express = require('express');

const UsersController = require('./controllers/UsersController');
const TasksController = require('./controllers/TasksController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const SearchController = require('./controllers/SearchController');

const routes = express.Router();


//Routes of Session 
routes.post('/session', SessionController.store);

//Routes of Users 
routes.get('/users', UsersController.index)
routes.post('/users', UsersController.store);
routes.post('/users_search', UsersController.show);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.destroy);

//Routes of Tasks
routes.get('/tasks', TasksController.index);
routes.post('/tasks', TasksController.store);
routes.put('/tasks/:id', TasksController.update);
routes.delete('/tasks/:id', TasksController.destroy);

//Routes of Profile for User
routes.get('/profile/:search', ProfileController.index);

//Routes of Search
routes.get('/search', SearchController.index);

module.exports = routes;