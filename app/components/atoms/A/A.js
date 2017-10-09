import React, { Component } from 'react';

import styles from './A.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import { observer, inject } from 'mobx-react';

@inject('routing')
@observer
class A extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e) {
		e.preventDefault();

		this.props.routing.push(this.props.href);
	}
	render() {
		return (
			<a className={cls('A')} onClick={this.handleClick}>{this.props.children}</a>
		);
	}
}

export default A;