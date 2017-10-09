import React, {Component} from 'react';

import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import Form from '../../atoms/Form/Form';
import A from "../../atoms/A/A";

import styles from './AddProjectMemberForm.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import Select from '../../atoms/Select/Select';

import { observer, inject } from 'mobx-react';

@inject('user', 'projects', 'projectMember')
@observer
class AddProjectMemberForm extends Form {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.user.fetchAllUsers();
	}
	handleSubmit = () => {
		console.log(this.state.fields);
		this.props.projectMember.addToProject(this.props.projects.selected, this.state.fields);
	};


	getRoleSelectorOptionLabel = role => role.label;
	getRoleSelector() {
		return (
			<Select
				name={'role'}
				placeholder={'Выберите роль в проекте'}
				options={this.props.projectMember.availableRoles}
				getLabel={this.getRoleSelectorOptionLabel}
				valueKey={'key'}
				onChange={this.handleChangeField}
			/>
		);
	}
	getUserSelectorOptionLabel = user => `${user.first_name} ${user.last_name} @${user.username}`;
	getUserSelector() {
		if (!this.props.user.allUsers.success) {
			return <span>загружаем всех юзеров...</span>
		}

		return (
			<Select
				name={'user'}
				placeholder={'Выберите пользователя'}
				options={this.props.user.allUsers.data.results}
				getLabel={this.getUserSelectorOptionLabel}
				valueKey={'id'}
				onChange={this.handleChangeField}
			/>
		)
	}
	render() {
		console.log('allUsers', this.props.user.allUsers);
		return (
			<div className={cls('AddProjectMemberForm')}>
				<div className={cls('fields')}>
					{this.getRoleSelector()}
					{this.getUserSelector()}
				</div>
				<div className={cls('actions')}>
					<Button text={'Добавить к проекту'} onClick={this.handleSubmit}/>
				</div>
			</div>
		);
	}
}

export default AddProjectMemberForm;