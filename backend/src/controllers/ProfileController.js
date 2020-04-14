const connection = require('../database/connection');

module.exports = {
	async index(req, res) {
		const user_id = req.headers.authorization;	
		const { search } = req.query;
		
		if(search) {
			const tasks = await connection('tasks')
				.where('title', 'like', `%${search}%`)
				.where('user_id', user_id)
				.select('*');

			return res.json(tasks);	
		} else {
			const tasks = await connection('tasks')
				.where('user_id', user_id)
				.select('*');
			return res.json(tasks);
		}	

		return res.json({ error: 'Error search this to-do' });
	}
}