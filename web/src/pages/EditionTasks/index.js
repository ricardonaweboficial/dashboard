import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import notebookImage from '../../assets/support-notes.svg';

import './styles.css';

export default function Profile() {
	const { title, description, id, user_id } = useParams();
	const history = useHistory();

	const [ titleModify, setTitleModify ] = useState(title);
	const [ descriptionModify, setDescriptionModify ] = useState(description);

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

	return (
		<div className="edition-container">

			<form onSubmit={handleEdition}>
				<input 
					value={titleModify}
					onChange={e => setTitleModify(e.target.value)}
					placeholder="Título"
					required
				/>
				<textarea 
					value={descriptionModify}
					onChange={e => setDescriptionModify(e.target.value)}
					placeholder="Descrição"
					required
				/>

				<button className="button" type="submit">Editar</button>
			</form>
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