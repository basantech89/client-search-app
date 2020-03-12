import React, { useRef, useState } from 'react';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { fetchPredictions } from '../../utils/apiCaller';
import styles from './search.module.scss';
import Modal from "../../components/generic/Modal";

const Search = () => {
	let theme = window.localStorage.getItem('theme');
	const searchTerm = useRef(null);
	const [predictions, setPredictions] = useState([]);

	const getCompanies = () => {
		fetchPredictions(searchTerm.current.value)
			.then(completions => {
				if (!searchTerm.current.value) {
					setPredictions([]);
				} else {
					setPredictions(completions)
				}
			})
			.catch(err => console.error(err));
	};

	const selectCompany = event => {
		searchTerm.current.companyId = event.target.dataset.id;
		searchTerm.current.value = event.target.dataset.name;
		setPredictions([]);
	};

	const ShowCompanies = () => {
		return (
			<ul className={styles.list}>
				{predictions.map((company, index) => (
					<li
						key={index}
						data-name={company.name}
						data-id={company.id}
						className={theme === 'light' ? styles.item : styles.itemDark}
						onClick={selectCompany}>
						{company.name}
					</li>
				))}
			</ul>
		);
	};
	return (
		<>
			<InputGroup size="lg">
				<Input
					innerRef={searchTerm}
					onChange={getCompanies}
					type="search"
					className="col-6"
					placeholder="Enter company name"
				/>
				<InputGroupAddon addonType="append">
					<Modal searchTerm={searchTerm} />
				</InputGroupAddon>
			</InputGroup>
			<ShowCompanies />
		</>
	);
};

export default Search;
