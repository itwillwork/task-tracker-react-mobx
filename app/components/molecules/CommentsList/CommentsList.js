import React, { Component } from 'react';

import styles from './CommentsList.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import CommentsListItem from './blocks/CommentsListItem/CommentsListItem';

class CommentsList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props);
		if (!this.props.comments.success) {
			return null;
		}
		return (
			<div className={cls('CommentsList')}>
				<div className={cls('title')}>Комментарии к задаче</div>
				{this.props.comments.data.map((comment, idx) => (
					<CommentsListItem
						key={idx}
						{...comment}
					/>
				))}
				{
					!this.props.comments.data.length
					&&
					<div className={cls('empty')}>Пока нет</div>
				}
			</div>
		);
	}
}

export default CommentsList;