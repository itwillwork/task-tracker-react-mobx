import React, {Component} from 'react';

// import styles from './Form.scss';
// import classNames from 'classnames/bind';
// const cls = classNames.bind(styles);

const noonObj = {};

class Form extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fields: noonObj,
		};
	}

	handleChangeField = (nameField, value) => {
		this.setState(state => ({
			fields: {
				...state.fields,
				[nameField]: value,
			}
		}))
	};

	clearField = () => {
		this.setState({
			fields: noonObj,
		})
	};
	handleSubmit = () => {
		// this.setState({
		// 	login: loader.begin()
		// });
		// const params = this.state.fields;
		// Cookies.set('firstName', 'Lisa', {});
		// sendData(params)
		// 	.then((res) => {
		// 		this.setState({
		// 			login: loader.success(res)
		// 		});
		// 	})
		// 	.catch((error) => {
		// 		this.setState({
		// 			login: loader.error(error),
		// 		});
		// 	});
	};
	render() {
		return null;
	}
}

export default Form;