import React, { Component } from 'react';

import styles from './TaskList.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import TaskListItem from './blocks/TaskListItem/TaskListItem';

import { observer, inject } from 'mobx-react';

@inject('tasks', 'projects', 'comments')
@observer
class TaskList extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.tasks.fetchProjectTask(this.props.projects.selected);
	}
	handleSelect = (selectedTaskId) => {
		this.props.tasks.selectTask(selectedTaskId);
		this.props.comments.fetchTaskComments(selectedTaskId, this.props.projects.selected.id);
	};

	render() {
		const projectTasks = this.props.tasks.projectTasks;

		return (
			<div className={cls('TaskList')}>
				<div className={cls('title')}>Задачи проекта</div>
				{
					projectTasks.success
					&&
					projectTasks.data.map((task, idx) => (
						<TaskListItem
							{...task}
							key={idx}
							onSelect={this.handleSelect}
							isSelected={task.id === this.props.tasks.selected.id}
						/>
					))
				}
			</div>
		);
	}
}

export default TaskList;