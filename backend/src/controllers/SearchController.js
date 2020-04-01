const connection = require('../database/connection');

module.exports = {
	async index(req, res) {
		const { search } = req.body;

		const tasks = await connection('tasks')
			.where('title', 'like', `%${search}%`)
			.select('*');

		return res.json(tasks);
	}
}