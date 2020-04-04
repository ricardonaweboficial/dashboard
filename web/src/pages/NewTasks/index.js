import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
// import { } from 'react-icons/fi';

import serverImage from '../../assets/server-woman.svg';

import './styles.css';

export default function NewTasks() {

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
			<form>
				<input placeholder="Título"/>
				<textarea placeholder="Descrição"/>
				<button className="button" type="submit" >Cadastrar</button>
			</form>
		</div>
	);
}