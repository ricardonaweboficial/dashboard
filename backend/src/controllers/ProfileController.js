const connection = require('../database/connection');

module.exports = {
	async index(req, res) {
		const user_id = req.headers.authorization;

		const tasks = await connection('tasks')
			.where('user_id', user_id)
			.select('*');

		return res.json(tasks);
	}
}