import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiChevronDown, FiTrash2, FiEdit, FiPower, FiSearch } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

export default function Profile() {
	const [ tasks, setTasks ] = useState([]);
	const [ search, setSearch ] = useState('');

	const user_id = localStorage.getItem('user_id');	
	const user_name = localStorage.getItem('user_name');
	const user_surname = localStorage.getItem('user_surname');

	const [ viewAbout, setViewAbout ] = useState(false);

	const history = useHistory();

	useEffect(() => {
		api.get('/profile', {
			headers: {
				authorization: user_id, 
			}
		}).then(response => {
			setTasks(response.data);
		})						
	}, [user_id]);


	async function searchTask(e) {
		e.preventDefault();	
		try {
			const response = await api.get(`profile?search=${search}` , {
				headers: {
					authorization: user_id
				}
			});

			setTasks(response.data)
			
		} catch (err) {
			return alert('Not exist this to-do');
		}
	}

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

	function displayBlock() {
		setViewAbout(!viewAbout);
	}

	
	function displayNone() {
		if(viewAbout) {
			setViewAbout(false);
		} else {
			return null;
		}
	}	



	return (
		// <span>Ver mais...</span>

		<div className="profile-container" onClick={displayNone}>

			<form onSubmit={searchTask}>
				<h2><span>Bem vindo,</span><br /> {user_name} {user_surname}</h2>
				<input 
					value={search}
					onChange={e => setSearch(e.target.value)}
					placeholder="Procure sua tarefa aqui pelo titulo..."
				/>
				<button className="buttonSearch" type="submit"><FiSearch /></button>
				<Link className="button" to="/profile/tasks/new">Cadastrar nova tarefa</Link>
				<div className="user" onClick={displayBlock}>
					<div className="userProfile">
						{viewAbout && (
							<ul>
								<li onClick={handleLogout}><FiPower size={16} color="red"/></li>
							</ul>
						)}
					</div>
					<FiChevronDown size={16} color="#0f0f0f"/>
				</div>
			</form>
			
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