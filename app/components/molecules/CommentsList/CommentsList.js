import React, { Component } from 'react';

import styles from './CommentsList.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import CommentsListItem from './blocks/CommentsListItem/CommentsListItem';

import { observer, inject } from 'mobx-react';

@inject('comments')
@observer
class CommentsList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props.comments.taskComments);
		if (!this.props.comments.taskComments.success) {
			return null;
		}
		return (
			<div className={cls('CommentsList')}>
				<div className={cls('title')}>Комментарии к задаче</div>
				{this.props.comments.taskComments.data.map((comment, idx) => (
					<CommentsListItem
						key={idx}
						{...comment}
					/>
				))}
			</div>
		);
	}
}

export default CommentsList;