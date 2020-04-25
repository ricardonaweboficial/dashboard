import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

import notebookImage from '../../assets/support-notes.svg';

export default function Register() {
	const [ name, setName ] = useState('');
	const [ surname, setSurname ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ senha, setSenha ] = useState('');
	const [ replaceSenha, setReplaceSenha ] = useState('');

	let history = useHistory();

	async function handleRegister(e) {
		e.preventDefault();

		const response = await api.post('users_search', { email });

		if(response.data.email !== email) {
			const data = {
				name,
				surname,
				email,
				senha,
			}
			if(senha === replaceSenha) {
				try {
					api.post('/users', data);

					alert('Usuário cadastrado com sucesso');

					history.push('/');
				} catch (err) {
					return alert('erro no register')
				}
			} else {

				return alert('As senhas não são idênticas');

			}

		} else {

			return alert('Este email já esta em uso');

		}
	}


	return (
		<div className="register-container">
			<section>
				<h1>Cadastro</h1>
				<img src={notebookImage} alt="Notebook Task"/>
				<p>Faça seu cadastro, melhore suas tarefas no dia a dia anotando-as.</p>				
				<Link to="/" className="back-link">
					<FiLogIn size={16} color='#76D9D3'/>
					Voltar para o login
				</Link>
			</section>
			<form onSubmit={handleRegister}>
				<div className="input-group">
					<input 
						value={name}
						onChange={e => setName(e.target.value)}
						placeholder="Nome"
						required
					/>
					<input 
						value={surname}
						onChange={e => setSurname(e.target.value)}
						placeholder="Sobrenome"
						required
					/>
				</div>
				<input 
					value={email}
					onChange={e => setEmail(e.target.value)}
					type="email" 
					placeholder="E-mail"
					required
				/>
				<input 
					value={senha}
					onChange={e => setSenha(e.target.value)}
					type="password" 
					placeholder="Senha"
					required
				/>
				<input 
					value={replaceSenha}
					onChange={e => setReplaceSenha(e.target.value)}
					type="password" 
					placeholder="Repetir senha"
					required
				/>

				<button className="button" type="submit">Cadastrar</button>
			</form>
		</div>
	);
}
