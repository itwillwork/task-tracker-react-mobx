import React, {Component} from 'react';

import CompactInput from '../../atoms/CompactInput/CompactInput';
import Button from '../../atoms/Button/Button';
import Form from '../../atoms/Form/Form';

import styles from './CreateProjectForm.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import { observer, inject } from 'mobx-react';

@inject('projects')
@observer
class CreateProjectForm extends Form {
	constructor(props) {
		super(props);
	}

	handleSubmit = () => {
		this.props.projects.addProject(this.state.fields).then(
			() => {
				this.props.projects.fetchUserProjects();
			},
			() => {
				this.props.projects.fetchUserProjects();
			});
	};
	render() {
		const { user } = this.props;
		const { fields: fieldsValues } = this.state;

		return (
			<div className={cls('CreateProjectForm')}>
				<div className={cls('fields')}>
					<CompactInput
						name={'name'}
						placeholder={'Название'}
						value={fieldsValues.name}
						onChange={this.handleChangeField}
					/>
				</div>
				<div className={cls('actions')}>
					<Button text={'+'} onClick={this.handleSubmit}/>
				</div>
			</div>
		);
	}
}

export default CreateProjectForm;