import React, { Component } from 'react';

import styles from './CommentsListItem.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import formatDate from '../../../../../utility/formatDate';

class CommentsListItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={cls('CommentsListItem')}>
				<div className={cls('text')}>{this.props.text}</div>
				<div className={cls('meta')}>{this.props.author}, {formatDate(this.props.created)} </div>
			</div>
		);
	}
}

export default CommentsListItem;