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
	const [ background_color_modify, setBackground_color_modify ] = useState('');


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
				setTitleModify(response.data.title);
				setDescriptionModify(response.data.description);
				setBackground_color_modify(response.data.background_color);
				setView(true);

			} catch (err) {
				return alert('error');
			}
		}
		loadModifyTask();
		
	}, [user_id, id]);

	
 
	async function handleEdition(e) {
		e.preventDefault();

		try {
			const data = {
				title: titleModify,
				description: descriptionModify,
				background_color: background_color_modify
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
		console.log(task.background_color)
	}
	return (
		<div className="edition-container">
			{view === true ? (
				<form onSubmit={handleEdition}>
					<div className="group-input-select">
						<input 
							value={titleModify}
							onChange={e => setTitleModify(e.target.value)}
							placeholder="Título"
							required
						/>
						<select style={{ backgroundColor: background_color_modify, color: background_color_modify}} value={background_color_modify} onChange={e => setBackground_color_modify(e.target.value)}>
							<option value="#FF9393">Vermelho</option>
							<option value="#DDDDDD">Cinza</option>
							<option value="#A2FF93">Verde</option>
							<option value="#9BA1FC">Azul</option>
						</select>
					</div>
					<textarea 
						value={descriptionModify}
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
				<Link to="/profile" className="back-link">
					<FiArrowLeft size={16} color='#76D9D3'/>
					Voltar para a home
				</Link>
			</section>
		</div>
	);
}

