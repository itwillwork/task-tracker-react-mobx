import React, { Component } from 'react';

import styles from './Accordion.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

class Accordion extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showChildren: false,
		};

		this.showChildren = this.toggleShowChildren.bind(this, true);
		this.hideChildren = this.toggleShowChildren.bind(this, false);
	}
	toggleShowChildren(value) {
		this.setState({
			showChildren: value
		})
	}
	render() {

		if (!this.state.showChildren) {
			return (
				<div className={cls('Accordion')}>
					<span className={cls('toggle')} onClick={this.showChildren}>{this.props.textForShow}</span>
				</div>
			);
		}

		return (
			<div className={cls('Accordion')}>
				<div>
					<span className={cls('toggle')} onClick={this.hideChildren}>{this.props.textFotHide}</span>
				</div>
				<div className={cls('container')}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

Accordion.defaultProps = {
	textForShow: 'Показать',
	textFotHide: 'Скрыть',
};

export default Accordion;