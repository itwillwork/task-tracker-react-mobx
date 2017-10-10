import React, { Component } from 'react';

import styles from './ProjectList.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import ProjectListItem from "./blocks/ProjectListItem/ProjectListItem";
import CreateProjectForm from "../../organisms/CreateProjectForm/CreateProjectForm";
import UserAuth from '../../organisms/UserAuth/UserAuth';

import { observer, inject } from 'mobx-react';

@inject('tracker')
@observer
class ProjectList extends Component {
	constructor(props) {
		super(props);

		this.handleSelect = this.handleSelect.bind(this);
	}

	handleSelect(id) {
		this.props.tracker.select(id);
	}
	render() {
		const { selectedProjectId, projects } = this.props.tracker;
		if (!projects.success) {
			return <span>loading ...</span>
		}
		return (
			<div className={cls('ProjectList')}>
				<UserAuth />
				<div className={cls('title')}>Проекты</div>
				<div className={cls('list')}>
					<div className={cls('container')}>
						{projects.data.map((project, idx) => (
							<ProjectListItem
								{...project}
								key={idx}
								onSelect={this.handleSelect}
								isSelected={selectedProjectId === project.id}
							/>
						))}
					</div>
				</div>
				<div className={cls('actions')}>
					<CreateProjectForm />
				</div>

			</div>
		);
	}
}

ProjectList.defaultProps = {
	selected: {},
	projects: [],
};

export default ProjectList;