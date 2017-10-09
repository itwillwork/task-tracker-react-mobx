import React, {Component} from 'react';

import styles from './SignUp.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import SignUpForm from "../../organisms/SignUpForm/SignUpForm";
import A from "../../atoms/A/A";
import CenterLayout from "../../templates/CenterLayout/CenterLayout";

class SignUp extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={cls('SignUp')}>
				<CenterLayout>
					<div className={cls('content')}>
						<div className={cls('title')}>Регистрация</div>
						<SignUpForm />
						<div className={cls('footer')}>
							<A href={'signin'}>Уже зарегестрированы?</A>
						</div>
					</div>
				</CenterLayout>
			</div>
		);
	}
}

export default SignUp;