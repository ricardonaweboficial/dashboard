import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiSearch, FiChevronDown, FiTrash2, FiEdit, FiPower } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

export default function Profile() {
	const [ tasks, setTasks ] = useState([]);
	const [ search, setSearch ] = useState('');

	const user_id = localStorage.getItem('user_id');	
	const user_name = localStorage.getItem('user_name');
	const user_surname = localStorage.getItem('user_surname');

	const history = useHistory();

	useEffect(() => {
			api.get(`profile/${search}`, {
				headers: {
					authorization: user_id, 
				}
			}).then(response => {
				setTasks(response.data);
			})			
	}, [user_id, search]);

	async function handleDeleteTask(id) {
		try {
			await api.delete(`tasks/${id}`, {
				headers: {
					authorization: user_id, 
				}
			})

			setTasks(tasks.filter(task => task.id !== id));

			alert('Tarefa excluida com sucesso.');
		} catch (err) {
			alert('Erro ao deletar tarefa, tente novamente.')
		}
	}

	function handleLogout() {
		localStorage.clear();

		history.push('/');
	}	

	return (
		// <span>Ver mais...</span>

		<div className="profile-container">

			<header>
				<h2><span>Bem vindo,</span><br /> {user_name} {user_surname}</h2>
				<input 
					value={search}
					onChange={e => setSearch(e.target.value)}
					placeholder="Procure sua tarefa aqui pelo titulo..." 
				/>
				<Link className="button" to="/profile/tasks/new">Cadastrar nova tarefa</Link>
				<div className="user">
					<div className="userProfile" />
					<FiChevronDown size={16} color="#0f0f0f"/>
					<FiPower onClick={handleLogout} size={16} color="lightred"/>
				</div>
			</header>
			
			<section>
				<div className="category">
					<h1>CATEGORIAS</h1>
					<ul>
						<li>Dia a dia</li>
						<li>Trabalhos</li>
						<li>Lições</li>
						<li>Listas</li>
						<li>Compras</li>
					</ul>
				</div>
				<hr />
				<div className="tasks">
					<ul>

						{tasks.map(task => (
							<li key={task.id}>
								<h1>{task.title}</h1>
								<hr/>
								<p>{task.description}</p> 
								<hr/>
								<small>Data: {task.date}</small>
								<div className="features-put-delete">
									<a className="button-methods" onClick={() => handleDeleteTask(task.id)}>
										<FiTrash2 size={20}/>	
									</a>
									<Link className="button-methods" to={`/profile/tasks/edition/${task.title}/${task.description}/${task.id}/${user_id}`}>
										<FiEdit size={20} />
									</Link>
								</div>
							</li>
						))}
					</ul>
				</div>
			</section>
		</div>
	);
}