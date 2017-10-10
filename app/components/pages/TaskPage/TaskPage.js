import React, {Component} from 'react';

import styles from './TaskPage.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import ProjectList from "../../molecules/ProjectList/ProjectList";
import Task from "../../molecules/Task/Task";
import Project from "../../molecules/Project/Project";

import { observer, inject } from 'mobx-react';

@inject('tracker', 'user', 'routing')
@observer
class TaskPage extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.user.login().then(res => {
			this.props.tracker.fetchProjects();
		}, err => {
			this.props.routing.push('signin');
		})
	}
	render() {
		return (
			<div className={cls('TaskPage')}>
				<div className={cls('projects-column')}>
					<ProjectList />
				</div>
				<div className={cls('project-column')}>
					<Project />
				</div>
				<div className={cls('task-column')}>
					<Task />
				</div>
			</div>
		);
	}
}

export default TaskPage;