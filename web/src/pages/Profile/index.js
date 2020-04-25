import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiChevronDown, FiTrash2, FiEdit, FiPower, FiSearch } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

export default function Profile() {
	const [ tasks, setTasks ] = useState([]);
	const [ search, setSearch ] = useState('');

	const user_id = localStorage.getItem('user_id');	
	const [ user_name, setUser_name ] = useState('');
	const [ user_surname, setUser_surname ] = useState('');

	const [ viewAbout, setViewAbout ] = useState(false);

	const history = useHistory();

	const { id } = useParams();

	useEffect(() => {
		async function loadNameAndSurname() {
			const response = await api.get(`/search_user/${id}`);

			setUser_name(response.data.name);
			setUser_surname(response.data.surname);
		}

		loadNameAndSurname();
	}, [id]);

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

			if(response) {
				setTasks(response.data);	
			} else {
				return alert('Deu nada');	
			}

			
			
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
		console.log(tasks)
	}

	
	function displayNone() {
		if(viewAbout) {
			setViewAbout(false);
		} else {
			return null;
		}
	}	

	function handleUser() {
		history.push(`/profile/user/${user_id}`);
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
								<li onClick={handleUser}>User Profile</li>
								<li onClick={handleLogout}><FiPower size={16} color="red"/></li>
							</ul>
						)}
					</div>
					<FiChevronDown size={16} color="#0f0f0f"/>
				</div>
			</form>
			
			<section>
				<div className="tasks">
					<h1 id="tarefas">Tarefas Cadastradas</h1>
					<ul>
						{tasks.length !== 0 ? tasks.map(task => (
						 	<li key={task.id} style={{ backgroundColor: task.background_color }}>
								<h1>{task.title}</h1>
								<hr/>
								<p>{task.description}</p> 
								<hr/>
								<small>Data: {task.date}</small>
								<div className="features-put-delete">
									<a className="button-methods" onClick={() => handleDeleteTask(task.id)}>
										<FiTrash2 size={20}/>	
									</a>
									<Link className="button-methods" to={`/profile/tasks/edition/${task.id}`}>
										<FiEdit size={20} />
									</Link>
								</div>
							</li>
						)) : (
							<li id="create-task">
								<p>Para começar crie sua primeira tarefa clicando no botão logo abaixou ou no botão logo acima (Cadastrar nova tarefa) </p>
								<Link className="button" to="/profile/tasks/new">Cadastrar primeira tarefa</Link>
							</li>
						)}
					</ul>
				</div>
			</section>
		</div>
	);
}
