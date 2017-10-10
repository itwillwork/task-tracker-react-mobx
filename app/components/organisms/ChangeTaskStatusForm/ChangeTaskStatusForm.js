import React, {Component} from 'react';

import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import Form from '../../atoms/Form/Form';
import A from "../../atoms/A/A";

import styles from './ChangeTaskStatusForm.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import Select from '../../atoms/Select/Select';

import { observer, inject } from 'mobx-react';

const mapStatus = {
	1: "Новый",
	2: "В работе",
	3: "Сделан",
};

const options = Object.keys(mapStatus).map(key => ({
	key,
	label: mapStatus[key],
}));

@inject('tracker')
@observer
class ChangeTaskStatusForm extends Form {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.user.fetchAllUsers();
	}
	handleSubmit = () => {
		this.props.tracker.selectedTask.changeStatus(this.state.fields);
	};


	getTaskStatusOptionLabel = opt => opt.label;
	getTaskStatusSelector() {
		return (
			<Select
				name={'status'}
				placeholder={'Выберите норвый статус'}
				options={options}
				getLabel={this.getTaskStatusOptionLabel}
				onChange={this.handleChangeField}
			/>
		);
	}
	render() {
		return (
			<div className={cls('ChangeTaskStatusForm')}>
				<div className={cls('field')}>
					{this.getTaskStatusSelector()}
				</div>
				<div className={cls('actions')}>
					<Button text={'Изменить'} onClick={this.handleSubmit}/>
				</div>
			</div>
		);
	}
}

export default ChangeTaskStatusForm;