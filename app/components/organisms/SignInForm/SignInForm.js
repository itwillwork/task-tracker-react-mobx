import React, {Component} from 'react';

import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import Form from '../../atoms/Form/Form';

import styles from './SignInForm.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import { observer, inject } from 'mobx-react';

@inject('user', 'routing')
@observer
class SignInForm extends Form {
	constructor(props) {
		super(props);
	}

	handleSubmit = () => {
		this.props.user.signin(this.state.fields).then(() => {
			this.props.routing.push('/');
		})
	};
	render() {
		const { signinInfo } = this.props.user;
		const { fields: fieldsValues } = this.state;

		return (
			<div className={cls('SignInForm')}>
				<div className={cls('fields')}>
					<Input
						name={'username'}
						placeholder={'Логин'}
						value={fieldsValues.username}
						onChange={this.handleChangeField}
					/>
					<Input
						name={'password'}
						placeholder={'Пароль'}
						type={'password'}
						value={fieldsValues.password}
						onChange={this.handleChangeField}
					/>
				</div>
				<div className={cls('actions')}>
					<Button text={'Войти'} onClick={this.handleSubmit}/>
				</div>
				{
					signinInfo.error
					&&
					(
						<div className={cls('error')}>{JSON.stringify(signinInfo.error)}</div>
					)
				}
			</div>
		);
	}
}

export default SignInForm;