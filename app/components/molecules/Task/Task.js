import React, { Component } from 'react';

import styles from './Task.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import Accordion from '../../atoms/Accordion/Accordion';
import CommentsList from '../../molecules/CommentsList/CommentsList';
import AddCommentForm from '../../organisms/AddCommentForm/AddCommentForm';
import ChangeTaskStatusForm from '../../organisms/ChangeTaskStatusForm/ChangeTaskStatusForm';
import ChangeAssignTaskForm from '../../organisms/ChangeAssignTaskForm/ChangeAssignTaskForm';

import formatDate from '../../../utility/formatDate';

import { observer, inject } from 'mobx-react';

// import { rolesMap } from '../../../models/tracker/Member';
import { mapStatus } from '../../../models/tracker/Task';

@inject('tracker')
@observer
class Task extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		console.log(this.props.tracker.selectedTask);
		const selectedTask = this.props.tracker.selectedTask;

		if (!selectedTask.id) {
			return null;
		}

		return (
			<div className={cls('Task')}>
				<div className={cls('name')}>
					{selectedTask.text}
				</div>
				<div className={cls('author')}>
					Автор: {selectedTask.author}
				</div>
				<div className={cls('created-date')}>
					Создана: {formatDate(selectedTask.created)}
				</div>
				<div className={cls('assign-to')}>
					Assign to: {selectedTask.assignToUser}
				</div>
				<Accordion
					textForShow={'Изменить assign to?'}
					textFotHide={'Скрыть форму'}
				><ChangeAssignTaskForm /></Accordion>
				<div className={cls('status')}>
					Статус: {mapStatus[selectedTask.status]}
				</div>
				<Accordion
					textForShow={'Изменить статус'}
					textFotHide={'Скрыть форму'}
				><ChangeTaskStatusForm /></Accordion>
				<div className={cls('last-modified-date')}>
					Изменено: {formatDate(selectedTask.lastModified)}
				</div>
				<div className={cls('description')}>
					{selectedTask.description}
				</div>
				<div className={cls('comments')}>
					<CommentsList
						comments={selectedTask.comments}
					/>
				</div>
				{/*<AddCommentForm />*/}
			</div>
		);
	}
}

export default Task;