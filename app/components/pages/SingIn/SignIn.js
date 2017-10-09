import React, {Component} from 'react';

import styles from './SignIn.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import SignInForm from "../../organisms/SignInForm/SignInForm";
import A from "../../atoms/A/A";
import CenterLayout from "../../templates/CenterLayout/CenterLayout";

class SignIn extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={cls('SignIn')}>
				<CenterLayout>
					<div className={cls('content')}>
						<div className={cls('title')}>Вход</div>
						<SignInForm />
						<div className={cls('footer')}>
							<A href={'signup'}>Еще не зарегестрированы?</A>
						</div>
					</div>
				</CenterLayout>
			</div>
		);
	}
}

export default SignIn;