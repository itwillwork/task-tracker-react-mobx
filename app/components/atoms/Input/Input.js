import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Input.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

class Input extends Component {
	constructor(props) {
		super(props);
	}
	handleChange = (event) => {
		this.props.onChange(this.props.name, event.target.value);
	};
	render() {
		const { name } = this.props;

		return (
			<div className={cls('Input')}>
				<input
					value={this.props.value}
					type={this.props.type}
					name={name}
					id={name}
					placeholder={this.props.example}
					onChange={this.handleChange}
				/>
				<label htmlFor={name}>{this.props.placeholder}</label>
			</div>
		);
	}
}


Input.defaultProps = {
	value: '',
	example: ' ',
	type: 'text',
};

Input.propTypes = {
	example: PropTypes.string,
	value: PropTypes.string,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	type: PropTypes.string,
};

export default Input;