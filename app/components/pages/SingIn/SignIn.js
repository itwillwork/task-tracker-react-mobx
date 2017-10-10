import React, {Component} from 'react';

import styles from './SignIn.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import SignInForm from "../../organisms/SignInForm/SignInForm";
import A from "../../atoms/A/A";
import CenterLayout from "../../templates/CenterLayout/CenterLayout";

import { observer, inject } from 'mobx-react';

@inject('tracker', 'user', 'routing')
@observer
class SignIn extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.user.login()
	}

	handleContinue = () => {
		this.props.routing.push('/');
	};

	getContinueButton() {
		return (
			<div
				className={cls('continue')}
				onClick={this.handleContinue}
			>Продолжить как {this.props.user.current.name} >></div>
		);
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
						{
							this.props.user.current.name
							&&
							this.getContinueButton()
						}
					</div>
				</CenterLayout>
			</div>
		);
	}
}

export default SignIn;