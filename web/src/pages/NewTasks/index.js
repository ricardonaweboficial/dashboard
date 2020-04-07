import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
// import { } from 'react-icons/fi';

import serverImage from '../../assets/server-woman.svg';

import './styles.css';

export default function NewTasks() {
	const user_id = localStorage.getItem('user_id');

	const [ title, setTitle ] = useState('');
	const [ description, setDescription ] = useState('');

	const history = useHistory();

	async function handleNewTask(e) {
		e.preventDefault();

		const data = {
			title,
			description
		}
		try {
			await api.post('tasks', data, {
				headers: {
					authorization: user_id, 
				}
			});

			history.push('/profile');
		} catch (err) {
			alert('Erro ao cadastrar tarefa, tente novamente.')
		}
	}

	return (
		<div className="new-task-container">
			<section>
				<h1>Cadastrar tarefas</h1>
				<img src={serverImage} alt="Create Task"/>
				<p>Crie suas tarefas para melhorar seu dia a dia.</p>				
				<Link to="/profile" className="back-link">
					<FiArrowLeft size={16} color='#EA3333'/>
					Voltar para o home
				</Link>
			</section>
			<form onSubmit={handleNewTask}>
				<input 
					value={title}
					onChange={e => setTitle(e.target.value)}
					placeholder="Título"/>
				<textarea 
					value={description}
					onChange={e => setDescription(e.target.value)}
					placeholder="Descrição"/>
				<button  className="button" type="submit">Cadastrar</button>
			</form>
		</div>
	);
}