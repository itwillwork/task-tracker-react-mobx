import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './CompactInput.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

class CompactInput extends Component {
	constructor(props) {
		super(props);
	}
	handleChange = (event) => {
		this.props.onChange(this.props.name, event.target.value);
	};
	render() {
		const { name } = this.props;

		return (
			<input
				className={cls('CompactInput')}
				value={this.props.value}
				type={this.props.type}
				name={name}
				id={name}
				placeholder={this.props.placeholder}
				onChange={this.handleChange}
			/>
		);
	}
}


CompactInput.defaultProps = {
	value: '',
	example: ' ',
	type: 'text',
};

CompactInput.propTypes = {
	example: PropTypes.string,
	value: PropTypes.string,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	type: PropTypes.string,
};

export default CompactInput;