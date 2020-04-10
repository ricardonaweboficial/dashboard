const connection = require('../database/connection');

module.exports = {
	async index(req, res) {
		const user_id = req.headers.authorization;
		const search = req.body;

		if(search === undefined) {
			const tasks = await connection('tasks')
				.where('user_id', user_id)
				.select('*');

			return res.json(tasks);
		}
		const tasks = await connection('tasks')
			.where('title', 'like', `%${search}%`)
			.whereIn('user_id', user_id)
			.select('*');

		return res.json(tasks);	
	}
}