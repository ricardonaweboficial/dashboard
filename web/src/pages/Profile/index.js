import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiTrash2, FiEdit } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Profile() {

	return (
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
						<li>
							<h1>Caminhar todas as manhãs</h1>
							<hr/>
							<p>08:30 Estar de pé e caminhar 30min no quarterão 09:30 Fazer tal coisa para terminar aquilo e continuar a receber a vontade propria de correr acom um significado de sentir a vontade de viver para si mesmo com a capacidade de nao negar a existencia da <br /><span>Ver mais...</span></p>
							<hr/>
							<small>Data: 03/04/2020 20:03:03</small>
							<div className="features-put-delete">
								<button>
									<FiTrash2 />	
								</button>
								<button>
									<FiEdit />
								</button>	
							</div>
						</li>
						<li>
							<h1>Caminhar todas as manhãs</h1>
							<hr/>
							<p>08:30 Estar de pé e caminhar 30min no quarterão 09:30 Fazer tal coisa para terminar aquilo e continuar a receber a vontade propria de correr acom um significado de sentir a vontade de viver para si mesmo com a capacidade de nao negar a existencia da <br /><span>Ver mais...</span></p>
							<hr/>
							<small>Data: 03/04/2020 20:03:03</small>
							<div className="features-put-delete">
								<button type="button">
									<FiTrash2 />	
								</button>
								<button type="button">
									<FiEdit />
								</button>	
							</div>
						</li>
						<li>
							<h1>Caminhar todas as manhãs</h1>
							<hr/>
							<p>08:30 Estar de pé e caminhar 30min no quarterão 09:30 Fazer tal coisa para terminar aquilo e continuar a receber a vontade propria de correr acom um significado de sentir a vontade de viver para si mesmo com a capacidade de nao negar a existencia da <br /><span>Ver mais...</span></p>
							<hr/>
							<small>Data: 03/04/2020 20:03:03</small>
							<div className="features-put-delete">
								<button type="button">
									<FiTrash2 />	
								</button>
								<button type="button">
									<FiEdit />
								</button>	
							</div>
						</li>
						<li>
							<h1>Caminhar todas as manhãs</h1>
							<hr/>
							<p>08:30 Estar de pé e caminhar 30min no quarterão 09:30 Fazer tal coisa para terminar aquilo e continuar a receber a vontade propria de correr acom um significado de sentir a vontade de viver para si mesmo com a capacidade de nao negar a existencia da <br /><span>Ver mais...</span></p>
							<hr/>
							<small>Data: 03/04/2020 20:03:03</small>
							<div className="features-put-delete">
								<button type="button">
									<FiTrash2 />	
								</button>
								<button type="button">
									<FiEdit />
								</button>	
							</div>
						</li>
					</ul>
				</div>
			</section>
		</div>
	);
}