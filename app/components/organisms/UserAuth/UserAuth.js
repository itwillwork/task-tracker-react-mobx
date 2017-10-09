import React, { Component } from 'react';

import styles from './UserAuth.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import { observer, inject } from 'mobx-react';

@inject('user', 'routing')
@observer
class UserAuth extends Component {
	constructor(props) {
		super(props);

		this.handleSelect = this.handleSelect.bind(this);
	}

	handleSelect() {
		this.props.user.logout().then(
			() => {
				this.props.routing.push('signin');
			},
			() => {
				this.props.routing.push('signin');
			}
		);
	}
	render() {
		const user = this.props.user.current;

		return (
			<div className={cls('UserAuth')}>
				<div className={cls('logout')} onClick={this.handleSelect}>Выйти</div>
				<div className={cls('user')}>{user.name}, {user.nick} </div>
			</div>
		);
	}
}

export default UserAuth;