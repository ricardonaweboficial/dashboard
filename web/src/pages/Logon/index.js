import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

import taskImage from '../../assets/table-task.png';

function Logon() {
	const [ email, setEmail ] = useState('');
	const [ senha, setSenha ] = useState('');

	async function handleLogin(e) {
		e.preventDefault();

		try {
			const response = await api.post('/session', { email, senha });

			console.log(response.data.name, response.data.surname );
		} catch (err) {
			alert('Falha no login tente novamente.');
		}
	}

	return (
		<div className="logon-container">
			<img src={taskImage} alt="Tasks "/>
			<section className="form">
				<h1>Dashboard para tarefas</h1>
				<p>Crie suas tarefas para se organizar no dia a dia.</p>
				<form onSubmit={handleLogin}>
					<input
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)} 
						placeholder="E-mail"
					/>
					<input
						type="password"
						value={senha}
						onChange={e => setSenha(e.target.value)} 
						placeholder="Senha"
					/>
					<button className="button" atype="submit">Entrar</button>
					<Link to="/register" className="back-link">
						<FiArrowLeft size={16} color='#76D9D3'/>
						Não tenho cadastro
					</Link>
				</form>
			</section>
		</div>
	);
}

export default Logon;
