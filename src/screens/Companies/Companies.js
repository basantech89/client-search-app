import React, { useEffect, useState } from 'react';
import { Table, Button, Alert } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { usePageContext } from "../../components/generic/Pagination/PageProvider";
import Pagination from "../../components/generic/Pagination/Pagination";
import styles from '../Search/search.module.scss';
import { fetchCompanies } from "../../utils/apiCaller";

const Companies = () => {
	const [companies, setCompanies] = useState([]);
	let theme = window.localStorage.getItem('theme');
	const itemsPerPage = 5;
	const { currentPage } = usePageContext();
	const lastItem = currentPage * itemsPerPage;
	const firstItem = lastItem - itemsPerPage;

	useEffect(() => {
		if (window.localStorage.getItem('companies')) {
			setCompanies(JSON.parse(window.localStorage.getItem('companies')));
		} else {
			fetchCompanies()
				.then(companies => {
					window.localStorage.setItem('companies', JSON.stringify(companies));
					setCompanies(companies);
				})
				.catch(error => console.error(error));
		}
	}, []);

	return (
		<>
			<div>
				<NavLink to="/"> <Button color="success" style={{ marginBottom: 30 }}> Add a Company </Button> </NavLink>
				<Alert color="info" className={styles.alert}>
					Showing {companies.length ? firstItem + 1 : 0} -
					{companies.length ? companies.length < lastItem ? companies.length : lastItem : 0} of {companies.length} entries
				</Alert>
			</div>
			<Table striped responsive style={{ color: theme === "light" ? 'black' : 'white' }}>
				<thead>
				<tr>
					<th> CIN </th>
					<th> Name </th>
				</tr>
				</thead>
				<tbody>
				{companies
					.slice(firstItem, lastItem)
					.map(company => (
						<tr key={company._id}>
							<td> {company.id} </td>
							<td> {company.name} </td>
						</tr>
					))}
				</tbody>
			</Table>
			<Pagination totalItems={companies.length} itemsPerPage={itemsPerPage} />
		</>
	);
};

export default Companies;
