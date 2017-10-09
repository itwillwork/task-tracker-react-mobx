import React, { Component } from 'react';

import styles from './ProjectList.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import ProjectListItem from "./blocks/ProjectListItem/ProjectListItem";
import CreateProjectForm from "../../organisms/CreateProjectForm/CreateProjectForm";
import UserAuth from '../../organisms/UserAuth/UserAuth';

import { observer, inject } from 'mobx-react';

@inject('projects', 'projectMember', 'user', 'routing')
@observer
class ProjectList extends Component {
	constructor(props) {
		super(props);

		this.handleSelect = this.handleSelect.bind(this);
	}
	componentDidMount() {
		this.props.user.login().then(res => {
			this.props.projects.fetchUserProjects();
		}, err => {
			this.props.routing.push('signin');
		})
	}
	handleSelect(id) {
		this.props.projects.selectProject(id);
		this.props.projectMember.fetchProjectMembers(id);
	}
	render() {
		if (!this.props.projects.userProjects.success) {
			return <span>loading ...</span>
		}
		return (
			<div className={cls('ProjectList')}>
				<UserAuth />
				<div className={cls('title')}>Проекты</div>
				<div className={cls('list')}>
					{this.props.projects.userProjects.data.map((project, idx) => (
						<ProjectListItem
							{...project}
							key={idx}
							onSelect={this.handleSelect}
							isSelected={this.props.projects.selected.id === project.id}
						/>
					))}
				</div>
				<div className={cls('actions')}>
					<CreateProjectForm />
				</div>

			</div>
		);
	}
}

export default ProjectList;