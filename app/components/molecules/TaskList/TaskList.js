import React, { Component } from 'react';

import styles from './TaskList.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import TaskListItem from './blocks/TaskListItem/TaskListItem';

class TaskList extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {

	}
	handleSelect = (selectedTaskId) => {
		this.props.onSelect(selectedTaskId);
	};

	render() {
		const tasksRequest = this.props.tasks;

		return (
			<div className={cls('TaskList')}>
				<div className={cls('title')}>Задачи проекта</div>
				{
					tasksRequest.success
					&&
					tasksRequest.data.map((task, idx) => (
						<TaskListItem
							{...task}
							key={idx}
							onSelect={this.handleSelect}
							isSelected={task.id === this.props.selectedTaskId}
						/>
					))
				}
				{
					tasksRequest.success && !tasksRequest.data.length
					&&
					(
						<div className={cls('empty')}>Пока нет</div>
					)
				}
			</div>
		);
	}
}

export default TaskList;