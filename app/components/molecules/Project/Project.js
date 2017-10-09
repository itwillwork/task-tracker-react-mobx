import React, { Component } from 'react';

import styles from './Project.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import Accordion from '../../atoms/Accordion/Accordion';
import TaskList from '../TaskList/TaskList';
import AddProjectMemberForm from '../../organisms/AddProjectMemberForm/AddProjectMemberForm';
import CreateTaskForm from '../../organisms/CreateTaskForm/CreateTaskForm';

import { observer, inject } from 'mobx-react';

@inject('projectMember', 'projects')
@observer
class Project extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const selected = this.props.projects.selected;

		if (!selected.id) {
			return null;
		}

		return (
			<div className={cls('Project')}>
				<div className={cls('name')}>
					{selected.name}
				</div>
				<div className={cls('author')}>
					Автор: {selected.author}
				</div>
				<div className={cls('create-date')}>
					Создана: {selected.created}
				</div>
				{
					this.props.projectMember.selectedProjectMembers
					&&
					(
						<div className={cls('members')}>
							<div className={cls('members-title')}> Участники </div>
							{this.props.projectMember.selectedProjectMembers.map(group => (
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
				<TaskList />
				<CreateTaskForm />
			</div>
		);
	}
}

export default Project;