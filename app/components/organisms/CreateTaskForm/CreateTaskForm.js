import React, {Component} from 'react';

import CompactInput from '../../atoms/CompactInput/CompactInput';
import Button from '../../atoms/Button/Button';
import Form from '../../atoms/Form/Form';
import Textarea from '../../atoms/Textarea/Textarea';

import styles from './CreateTaskForm.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import { observer, inject } from 'mobx-react';

@inject('tasks', 'projects')
@observer
class CreateTaskForm extends Form {
	constructor(props) {
		super(props);
	}

	handleSubmit = () => {
		this.props.tasks.addTask({
			...this.state.fields,
			"project_id": this.props.projects.selected.id,
			"section_id": null,
			"status": 1
		});

	};
	render() {
		const { user } = this.props;
		const { fields: fieldsValues } = this.state;

		return (
			<div className={cls('CreateTaskForm')}>
				<div className={cls('title')}>Добавление задачи</div>
				<div className={cls('row')}>
					<CompactInput
						name={'text'}
						placeholder={'Название'}
						value={fieldsValues.text}
						onChange={this.handleChangeField}
					/>
				</div>
				<div className={cls('row')}>
					<Textarea
						name={'description'}
						placeholder={'Описание'}
						value={fieldsValues.description}
						onChange={this.handleChangeField}
					/>
				</div>
				<div className={cls('actions')}>
					<Button text={'Добавить задачу'} onClick={this.handleSubmit}/>
				</div>
			</div>
		);
	}
}

export default CreateTaskForm;