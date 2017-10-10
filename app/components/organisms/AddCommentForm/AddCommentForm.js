import React, {Component} from 'react';

import CompactInput from '../../atoms/CompactInput/CompactInput';
import Button from '../../atoms/Button/Button';
import Form from '../../atoms/Form/Form';
import Textarea from '../../atoms/Textarea/Textarea';

import styles from './AddCommentForm.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import { observer, inject } from 'mobx-react';

@inject('tracker')
@observer
class AddCommentForm extends Form {
	constructor(props) {
		super(props);
	}

	handleSubmit = () => {
		this.props.tracker.selectedTask.addComment(this.state.fields);
	};
	render() {
		const { fields: fieldsValues } = this.state;

		return (
			<div className={cls('AddCommentForm')}>
				<div className={cls('title')}>Добавление комментария</div>
				<div className={cls('row')}>
					<Textarea
						name={'text'}
						placeholder={'Ваш комменттарий'}
						value={fieldsValues.text}
						onChange={this.handleChangeField}
					/>
				</div>
				<div className={cls('actions')}>
					<Button text={'Комментировать'} onClick={this.handleSubmit}/>
				</div>
			</div>
		);
	}
}

export default AddCommentForm;