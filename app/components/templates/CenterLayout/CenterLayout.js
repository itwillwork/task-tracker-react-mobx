import React, {Component} from 'react';

import styles from './CenterLayout.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

class CenterLayout extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={cls('CenterLayout')}>
				{this.props.children}
			</div>
		);
	}
}

export default CenterLayout;