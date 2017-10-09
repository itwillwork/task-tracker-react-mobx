import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Textarea.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

class Textarea extends Component {
	constructor(props) {
		super(props);
	}
	handleChange = (event) => {
		this.props.onChange(this.props.name, event.target.value);
	};
	render() {
		return (
			<textarea
				className={cls('Textarea')}
				name={this.props.name}
				onChange={this.handleChange}
				placeholder={this.props.placeholder}
			></textarea>
		);
	}
}


Textarea.defaultProps = {
	name: '',
	placeholder: '',
};

Textarea.propTypes = {
	name: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
};

export default Textarea;