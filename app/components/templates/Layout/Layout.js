import React, { Component } from 'react';

import styles from './Layout.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

class Layout extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={cls('Layout')}>
				{this.props.children}
			</div>
		);
	}
}

export default Layout;