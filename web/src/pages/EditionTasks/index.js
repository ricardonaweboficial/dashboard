import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import notebookImage from '../../assets/support-notes.svg';

import './styles.css';

export default function Profile() {
	const history = useHistory();

	const user_id = localStorage.getItem('user_id');

	const { id } = useParams();

	const [ task, setTask ] = useState([]);

	const [ titleModify, setTitleModify ] = useState('');
	const [ descriptionModify, setDescriptionModify ] = useState('');

	const [ view, setView ] = useState(false);

	useEffect(() => {
		async function loadModifyTask() {
			try {
				const response = await api.get(`/search?id=${id}`, {
					headers: {
						authorization: user_id
					}
				});

				setTask(response.data);

				setView(true);

			} catch (err) {
				return alert('error');
			}
		}
		loadModifyTask();
	}, []);
 
	async function handleEdition(e) {
		e.preventDefault();

		try {
			const data = {
				title: titleModify,
				description: descriptionModify
			}
			await api.put(`tasks/${id}`,data, {
				headers: {
					authorization: user_id
				}
			});

			return history.push('/profile');
		} catch (err) {
			alert('Erro na modificação da tarefa.');
		}

	}

	function test() {
		console.log(background_color_modify)
	}

	return (
		<div className="edition-container">
			<button onClick={test}>D</button>
			{view === true ? (
				<form onSubmit={handleEdition}>
					<div className="group-input-select">
						<input 
							value={task.title}
							onChange={e => setTitleModify(e.target.value)}
							placeholder="Título"
							required
						/>
						<select>
							<option value="red">Vermelho</option>
							<option value="grey">Cinza</option>
							<option value="green">Verde</option>
							<option value="blue">Azul</option>
						</select>
					</div>
					<textarea 
						value={task.description}
						onChange={e => setDescriptionModify(e.target.value)}
						placeholder="Descrição"
						required
					/>

					<button className="button" type="submit">Editar</button>
				</form>
			) : <h1>Carregando</h1>}
			<section>
				<h1>Edição de tarefa</h1>
				<img src={notebookImage} alt="Notebook Task"/>
				<p>Edite algum erro ou aumente sua tarefa.</p>				
				<Link to="/" className="back-link">
					<FiArrowLeft size={16} color='#76D9D3'/>
					Voltar para o login
				</Link>
			</section>
		</div>
	);
}

