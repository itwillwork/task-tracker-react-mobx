import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Select.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

class Select extends Component {
	constructor(props) {
		super(props);
	}
	handleChange = (event) => {
		this.props.onChange(this.props.name, event.target.value);
	};
	render() {
		console.log(this.props);
		return (
			<div className={cls('Select')}>
				<select name={this.props.name} onChange={this.handleChange}>
					<option disabled default>{this.props.placeholder}</option>
					{this.props.options.map((option, key) => (
						<option key={key} value={option[this.props.valueKey]}>{this.props.getLabel(option)}</option>
					))}
				</select>
			</div>
		);
	}
}


Select.defaultProps = {
	name: '',
	placeholder: '',
	options: [],
};

Select.propTypes = {
	name: PropTypes.string,
	placeholder: PropTypes.string,
	options: PropTypes.array,
	onChange: PropTypes.func,
};

export default Select;