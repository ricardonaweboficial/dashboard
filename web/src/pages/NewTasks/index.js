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
	const [ background_color, setBackground_color ] = useState('#76D9D3');

	const history = useHistory();

	async function handleNewTask(e) {
		e.preventDefault();

		const data = {
			title,
			description,
			background_color
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
				<img src={serverImage} alt="Create Task" />
				<p>Crie suas tarefas para melhorar seu dia a dia.</p>				
				<Link to="/profile" className="back-link">
					<FiArrowLeft size={16} color='#EA3333' />
					Voltar para o home
				</Link>
			</section>
			<form onSubmit={handleNewTask}>
				<div className="group-input-select">
					<input 
						required
						value={title}
						onChange={e => setTitle(e.target.value)}
						placeholder="Título"/>
					<select style={{ backgroundColor: background_color, color: background_color}} value={background_color} onChange={e => setBackground_color(e.target.value)} id="backgroundColor">
						<option value="#76D9D3">Ocean</option>
						<option value="#FF9393">Vermelho</option>
						<option value="#DDDDDD">Cinza</option>
						<option value="#A2FF93">Verde</option>
						<option value="#9BA1FC">Azul</option>
					</select>
				</div>
				<textarea 
					required
					value={description}
					onChange={e => setDescription(e.target.value)}
					placeholder="Descrição"/>
				<button  className="button" type="submit">Cadastrar</button>
			</form>
		</div>
	);
}