import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiTrash2, FiEdit } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Profile() {
	const [ tasks, setTasks ] = useState([]);

	const user_id = localStorage.getItem('user_id');
	const user_name = localStorage.getItem('user_name');
	const user_surname = localStorage.getItem('user_surname');

	useEffect(() => {
		api.get('profile', {
			headers: {
				authorization: user_id, 
			}
		}).then(response => {
			setTasks(response.data);
		})
	}, [user_id])

	return (
		// <span>Ver mais...</span>

		<div className="profile-container">
			<header>
				<img src={logoImg} alt="logo-task"/>
				<input placeholder="Procure sua tarefa aqui pelo titulo..." />
				<Link className="button" to="/profile/tasks/new">Cadastrar nova tarefa</Link>
				<div className="user">
					<div className="userProfile" />
					<FiChevronDown size={16} color="#0f0f0f"/>
				</div>
			</header>
			<h1>Bem vindo, {user_name} {user_surname}</h1>
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
									<button>
										<FiTrash2 />	
									</button>
									<button>
										<FiEdit />
									</button>	
								</div>
							</li>
						))}
					</ul>
				</div>
			</section>
		</div>
	);
}