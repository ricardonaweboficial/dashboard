const connection = require('../database/connection');

module.exports = {
	async store(req, res) {
		const { email, senha } = req.body;

		const user = await connection('users')
			.where({
				'email': email,
				'senha': senha,
			})
			.select('name', 'surname')
			.first();
		if(!user) {
			return res.status(400).json({ error: 'No this user exist' })
		}

		return res.json(user)

	}
}