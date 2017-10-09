import React, {Component} from 'react';

import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import Form from '../../atoms/Form/Form';
import A from "../../atoms/A/A";

import styles from './SignUpForm.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import { observer, inject } from 'mobx-react';

@inject('user')
@observer
class SignUpForm extends Form {
	constructor(props) {
		super(props);
	}
	handleSubmit = () => {
		this.props.user.signup(this.state.fields);
	};

	render() {
		const { signupInfo } = this.props.user;
		const { fields: fieldsValues } = this.state;

		return (
			<div className={cls('SignUpForm')}>
				<div className={cls('fields')}>
					<Input
						name={'username'}
						placeholder={'Логин'}
						value={fieldsValues.username}
						onChange={this.handleChangeField}
					/>
					<Input
						name={'email'}
						placeholder={'Электронный ящик'}
						value={fieldsValues.email}
						onChange={this.handleChangeField}
					/>
					<Input
						name={'firstName'}
						placeholder={'Имя'}
						value={fieldsValues.firstName}
						onChange={this.handleChangeField}
					/>
					<Input
						name={'lastName'}
						placeholder={'Фамилия'}
						value={fieldsValues.lastName}
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
					<Button text={'Регистрация'} onClick={this.handleSubmit}/>
				</div>
				{
					signupInfo.error
					&&
					(
						<div className={cls('error')}>{signupInfo.error}</div>
					)
				}
				{
					signupInfo.success
					&&
					(
						<div className={cls('success')}>Регистрация прошла успешно. Можно попробовать <A href={'signin'}>залогинится</A></div>
					)
				}
			</div>
		);
	}
}

export default SignUpForm;