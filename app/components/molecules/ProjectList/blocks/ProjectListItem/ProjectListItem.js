import React, { Component } from 'react';

import styles from './ProjectListItem.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

class ProjectListItem extends Component {
	constructor(props) {
		super(props);

		this.handleSelect = this.handleSelect.bind(this);
	}

	handleSelect() {
		this.props.onSelect(this.props.id);
	}
	render() {
		return (
			<div className={cls('ProjectListItem', {'ProjectListItem--isSelected': this.props.isSelected})} onClick={this.handleSelect}>
				<div className={cls('name')}>
					{this.props.name}
				</div>
				<div className={cls('author')}>
					{this.props.author.first_name} {this.props.author.last_name}
				</div>
			</div>
		);
	}
}

export default ProjectListItem;