import React, {Component} from 'react';

import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import Form from '../../atoms/Form/Form';
import A from "../../atoms/A/A";

import styles from './ChangeAssignTaskForm.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import Select from '../../atoms/Select/Select';

import { observer, inject } from 'mobx-react';

@inject('user', 'projects', 'projectMember')
@observer
class ChangeAssignTaskForm extends Form {
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
		return (
			<div className={cls('ChangeAssignTaskForm')}>
				<div className={cls('field')}>
					{this.getUserSelector()}
				</div>
				<div className={cls('actions')}>
					<Button text={'Изменить'} onClick={this.handleSubmit}/>
				</div>
			</div>
		);
	}
}

export default ChangeAssignTaskForm;