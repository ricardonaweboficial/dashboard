import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import notebookImage from '../../assets/support-notes.svg';

function Register() {

	return (
		<div className="register-container">
			<section>
				<h1>Cadastro</h1>
				<img src={notebookImage} alt="Notebook Task"/>
				<p>Faça seu cadastro, melhore suas tarefas no dia a dia anotando-as.</p>				
				<Link to="/" className="back-link">
					<FiLogIn size={16} color='#76D9D3'/>
					Voltar para o login
				</Link>
			</section>
			<form>
				<div className="input-group">
					<input placeholder="Nome"/>
					<input placeholder="Sobrenome"/>
				</div>
				<input type="email" placeholder="E-mail"/>
				<input type="password" placeholder="Senha"/>
				<input type="password" placeholder="Repetir senha"/>

				<button className="button" type="submit" >Cadastrar</button>
			</form>
		</div>
	);
}

export default Register;