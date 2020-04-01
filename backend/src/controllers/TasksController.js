const dateNow = require('../utils/dateNow');
const connection = require('../database/connection');

module.exports = {
	async index(req, res) {
		
		const [ count ] = await connection('tasks').count();

		const tasks = await connection('tasks')
			.join('users', 'users.id', '=', 'tasks.user_id')
			.select([
				'tasks.*',
				'users.name',
				'users.surname',
				'users.email',
				'users.senha',
			]);

		res.header('X-Total-Count', count['count(*)'])

		return res.json(tasks);

	},

	async store(req, res) {
		const { title, description } = req.body;
		const user_id = req.headers.authorization;
	
		const date = dateNow()

		const response = await connection('tasks').insert({
			title,
			description,
			date,
			user_id
		});

		return res.json(response);
	},

	async update(req, res) {
		const { title, description } = req.body;
		const { id } = req.params;
		const dateModify = dateNow();

		const user_id = req.headers.authorization;

		const tasks = await connection('tasks')
			.where('id', id)
			.select('user_id')
			.first();

		if(tasks.user_id !== user_id) {
			return res.status(401).json({ error: 'Operation not permitted.'})
		}

		await connection('tasks').where('id', id).update({
			title,
			description,
			date: dateModify
		})

		return res.json({
			title,
			description
		})
	},

	async destroy(req, res) {
		const { id } = req.params;
		const user_id = req.headers.authorization;

		const tasks = await connection('tasks')
			.where('id', id)
			.select('user_id')
			.first();

		if(tasks.user_id !== user_id) {
			return res.status(401).json({ error: 'Operation not permitted.'})
		}

		await connection('tasks').where('id', id).delete();

		return res.status(204).send();
	}
}