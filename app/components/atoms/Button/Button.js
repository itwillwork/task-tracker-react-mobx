import React, { Component } from 'react';

import styles from './Button.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

class Button extends Component {
	render() {
		const { name } = this.props;

		return (
			<button
				onClick={this.props.onClick}
				className={cls('Button')}
			>{this.props.text}</button>
		);
	}
}

export default Button;