import React, { Component } from 'react';

import styles from './Project.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import formatDate from '../../../utility/formatDate';
import Accordion from '../../atoms/Accordion/Accordion';
import TaskList from '../TaskList/TaskList';
import AddProjectMemberForm from '../../organisms/AddProjectMemberForm/AddProjectMemberForm';
import CreateTaskForm from '../../organisms/CreateTaskForm/CreateTaskForm';

import { observer, inject } from 'mobx-react';

@inject('tracker', 'user', 'routing')
@observer
class Project extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const selectedProject= this.props.tracker.selectedProject;

		if (!selectedProject.id) {
			return null;
		}

		return (
			<div className={cls('Project')}>
				<div className={cls('name')}>
					{selectedProject.name}
				</div>
				<div className={cls('author')}>
					Автор: {selectedProject.author}
				</div>
				<div className={cls('create-date')}>
					Создана: {formatDate(selectedProject.created)}
				</div>
				{
					selectedProject.members
					&&
					(
						<div className={cls('members')}>
							<div className={cls('members-title')}> Участники </div>
							{selectedProject.members.map(group => (
								<div className={cls('members-group')}>{group}</div>
							))}
						</div>
					)
				}
				<Accordion
					textForShow={'Добавление нового человека в проект'}
					textFotHide={'Скрыть форму'}
				>
					<AddProjectMemberForm />
				</Accordion>
				<TaskList
					onSelect={selectedProject.select}
					tasks={selectedProject.tasks}
					selectedTaskId={selectedProject.selectedTaskId}
				/>
				<CreateTaskForm />
			</div>
		);
	}
}

export default Project;