import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';


import './styles.css';

import notebookImage from '../../assets/personal_data_.svg';

export default function User() {
	const [ userOne, setUserOne ] = useState([]);

	const [ nameMod, setNameMod ] = useState('');
	const [ surnameMod, setSurnameMod ] = useState('');
	const [ senhaMod, setSenhaMod ] = useState('');
	const [ replaceSenhaMod, setReplaceSenhaMod ] = useState('');

	let history = useHistory();

	const { id } = useParams();

	useEffect(() => {
		async function loadOneUser() {
			try {
				const response = await api.get(`/search_user/${id}`);

				setUserOne(response.data);
				setNameMod(response.data.name);
				setSurnameMod(response.data.surname);
				setSenhaMod(response.data.senha);
				setReplaceSenhaMod(response.data.senha);
			} catch (err) {
				return alert('Erro ao mostrar o seu usuario, tente novamente.');
				history.push('/profile');
			}
		};

		loadOneUser();
	}, [id]);

	async function handleUserModify(e) {
		e.preventDefault();

		try {
			await api.put(`/users/${id}`, {
				name: nameMod,
				surname: surnameMod,
				senha: senhaMod,
				replaceSenha: replaceSenhaMod,
			});

			history.goBack();
		} catch (err) {

		}

	}

	return (
		<div className="user-profile-container">
			<section>
				<h1>Painel do usuário</h1>
				<img src={notebookImage} alt="Notebook Task"/>
				<Link to="/profile" className="back-link">
					<FiLogIn size={16} color='#76D9D3'/>
					Voltar para a home
				</Link>
			</section>
			<form onSubmit={handleUserModify}>
				<div className="input-group">
					<input
						value={nameMod}
						onChange={e => setNameMod(e.target.value)} 
						placeholder="Nome"
						required
					/>
					<input
						value={surnameMod}
						onChange={e => setSurnameMod(e.target.value)} 
						placeholder="Sobrenome"
						required
					/>
				</div>
				<input
					value={senhaMod}
					onChange={e => setSenhaMod(e.target.value)} 
					placeholder="Senha"
					required
				/>
				<input
					value={replaceSenhaMod}
					onChange={e => setReplaceSenhaMod(e.target.value)} 
					placeholder="Repetir senha"
					required
				/>

				<button className="button" type="submit">Cadastrar</button>
			</form>
		</div>
	);
};