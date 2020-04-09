import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import notebookImage from '../../assets/support-notes.svg';

import './styles.css';

export default function Profile() {

	async function handleEdition(e) {
		e.preventDefault();
		return '';
	}

	return (
		<div className="edition-container">

			<form onSubmit={handleEdition}>
				<input 
					placeholder="Título"
					required
				/>
				<textarea 
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