import React, { Component } from 'react';

import styles from './Task.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import Accordion from '../../atoms/Accordion/Accordion';
import CommentsList from '../../molecules/CommentsList/CommentsList';
import AddCommentForm from '../../organisms/AddCommentForm/AddCommentForm';
import ChangeTaskStatusForm from '../../organisms/ChangeTaskStatusForm/ChangeTaskStatusForm';
import ChangeAssignTaskForm from '../../organisms/ChangeAssignTaskForm/ChangeAssignTaskForm';

import { observer, inject } from 'mobx-react';

const mapStatus = {
	1: "Новый",
	2: "В работе",
	3: "Сделан",
};

@inject('tasks')
@observer
class Task extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const selected = this.props.tasks.selected;

		if (!selected.id) {
			return null;
		}

		return (
			<div className={cls('Task')}>
				<div className={cls('name')}>
					{selected.text}
				</div>
				<div className={cls('author')}>
					Автор: {selected.author}
				</div>
				<div className={cls('created-date')}>
					Создана: {selected.created}
				</div>
				<div className={cls('assign-to')}>
					Assign to: {selected.assignToUser}
				</div>
				<Accordion
					textForShow={'Изменить assign to?'}
					textFotHide={'Скрыть форму'}
				><ChangeAssignTaskForm /></Accordion>
				<div className={cls('status')}>
					Статус: {mapStatus[selected.status]}
				</div>
				<Accordion
					textForShow={'Изменить статус'}
					textFotHide={'Скрыть форму'}
				><ChangeTaskStatusForm /></Accordion>
				<div className={cls('last-modified-date')}>
					Изменено: {selected.lastModified}
				</div>
				<div className={cls('description')}>
					{selected.description}
				</div>
				<div className={cls('comments')}>
					<CommentsList />

				</div>
				<AddCommentForm />
			</div>
		);
	}
}

export default Task;