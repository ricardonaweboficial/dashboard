import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

import notebookImage from '../../assets/support-notes.svg';

function Register() {
	const [ name, setName ] = useState('');
	const [ surname, setSurname ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ senha, setSenha ] = useState('');
	const [ replaceSenha, setReplaceSenha ] = useState('')

	function handleRegister(e) {
		e.preventDefault();

		const data = {
			name,
			surname,
			email,
			senha,
			replaceSenha
		};
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
					/>
					<input 
						value={surname}
						onChange={e => setSurname(e.target.value)}
						placeholder="Sobrenome"
					/>
				</div>
				<input 
					value={email}
					onChange={e => setEmail(e.target.value)}
					type="email" 
					placeholder="E-mail"
				/>
				<input 
					value={senha}
					onChange={e => setSenha(e.target.value)}
					type="password" 
					placeholder="Senha"
				/>
				<input 
					value={replaceSenha}
					onChange={e => setReplaceSenha(e.target.value)}
					type="password" 
					placeholder="Repetir senha"
				/>

				<button className="button" type="submit">Cadastrar</button>
			</form>
		</div>
	);
}

export default Register;