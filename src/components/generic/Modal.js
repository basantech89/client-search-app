import React, { useState } from 'react';
import { Modal as ReactstrapModal, ModalFooter, ModalHeader, ModalBody, Button } from 'reactstrap';
import { withRouter } from "react-router-dom";
import { postCompany, fetchCompanies } from "../../utils/apiCaller";

const Modal = ({ searchTerm, history }) => {
	const [modalState, setModalState] = useState(false);
	const toggle = () => setModalState(!modalState);

	const submitCompany = async () => {
		try {
			let companies;
			if (window.localStorage.getItem('companies')) {
				companies = JSON.parse(window.localStorage.getItem('companies'));
			} else {
				companies = await fetchCompanies();
				window.localStorage.setItem('companies', JSON.stringify(companies))
			}
			if (companies.some(company => company.name === searchTerm.current.value)) {
				toggle();
			} else {
				const company = await postCompany({
					id: searchTerm.current.companyId,
					name: searchTerm.current.value
				});
				window.localStorage.setItem('companies',
					JSON.stringify([{ id: company.id, name: company.name }, ...companies])
				);
				history.push('/companies');
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
			<Button color="primary" onClick={submitCompany}> Submit </Button>
			<ReactstrapModal isOpen={modalState} toggle={toggle}>
				<ModalHeader toggle={toggle}> Information </ModalHeader>
				<ModalBody>
					<p> This Company is already submitted </p>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={toggle}> Ok </Button>
				</ModalFooter>
			</ReactstrapModal>
		</>
	);
};

export default withRouter(Modal);
