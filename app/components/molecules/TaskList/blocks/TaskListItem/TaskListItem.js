import React, { Component } from 'react';

import styles from './TaskListItem.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

const mapStatus = {
	1: "Новый",
	2: "В работе",
	3: "Сделан",
};

class TaskListItem extends Component {
	constructor(props) {
		super(props);
	}

	handleSelect = () => {
		this.props.onSelect(this.props.id);
	};

	render() {
		return (
			<div className={cls('TaskListItem', {'TaskListItem--isSelected': this.props.isSelected})} onClick={this.handleSelect}>
				<div className={cls('name')}>
					{this.props.text}
				</div>
				<div className={cls('info')}>
					{mapStatus[this.props.status]}, {this.props.author.first_name} {this.props.author.last_name}
				</div>
			</div>
		);
	}
}

export default TaskListItem;