const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = { 
	async index(req, res) {
		const users = await connection('users').select('*');

		return res.json(users);
	},

	async store(req, res) {
		const { name, surname, email, senha } = req.body;

		const id = crypto.randomBytes(4).toString('HEX');

		const response = await connection('users').insert({
			id,
			name,
			surname,
			email,
			senha
		})
		
		return res.json(response);
	},

	async update(req, res) {
		const { name, surname, senha } = req.body;

		const { id } = req.params;

		await connection('users')
			.where('id', id)
			.update({
				name, 
				surname,
				senha
			});

		
		
		return res.json({
			name,
			surname,
			senha
		});
	},

	async destroy(req, res) {
		const { id } = req.params;

		await connection('users')
			.where('id', id)
			.delete();

		return res.status(204).send();
	}
};