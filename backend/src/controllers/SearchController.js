const connection = require('../database/connection');

module.exports = {
	async index(req, res) {
		const { id } = req.query;
		const user_id = req.headers.authorization;

		const tasks = await connection('tasks')
			.where('id', id)
			.where('user_id', user_id)
			.select()
			.first();

		return res.json(tasks);
	},

	async show(req, res) {
		const { id } = req.params;

		const users = await connection('users')
			.select('*')
			.where('id', '=' , id)
			.first();

		return res.json(users);
	}
}