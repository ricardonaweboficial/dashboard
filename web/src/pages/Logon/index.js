import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import taskImage from '../../assets/support-notes.svg';

function Logon() {

	return (
		<div className="logon-container">
			<img src={taskImage} alt="Tasks "/>
			<section className="form">
				<h1>Dashboard para tarefas</h1>
				<p>Crie suas tarefas para se organizar no dia a dia.</p>
				<form>
					<input placeholder="E-mail"/>
					<input placeholder="Senha"/>
					<button className="button" atype="submit">Entrar</button>
					<Link to="/register" className="back-link">
						<FiArrowLeft size={16} color='#76D9D3'/>
						Não tenho cadastro
					</Link>
				</form>
			</section>
		</div>
	);
}

export default Logon;
