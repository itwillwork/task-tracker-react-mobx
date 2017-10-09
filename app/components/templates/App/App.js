import React, {Component} from 'react';

import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import {
	Router,
	Route,
} from 'react-router'

const browserHistory = createBrowserHistory();

import User from '../../../models/user';
import Projects from '../../../models/projects';
import ProjectMember from '../../../models/projectMember';
import Tasks from '../../../models/tasks';
import Comments from '../../../models/comments';

const routingStore = new RouterStore();
const stores = {
	routing: routingStore,
	user:  User,
	projects: Projects,
	projectMember: ProjectMember,
	tasks: Tasks,
	comments: Comments,
};

const history = syncHistoryWithStore(browserHistory, routingStore);

import styles from './App.scss';
import classNames from 'classnames/bind';
const cls = classNames.bind(styles);

import { Provider } from 'mobx-react';
import SignIn from "../../pages/SingIn/SignIn";
import SignUp from "../../pages/SignUp/SignUp";
import TaskPage from "../../pages/TaskPage/TaskPage";

class App extends Component{
    render() {
        return (
            <Provider {...stores}>
                <Router history={history}>
					<div className={cls('App')}>
						<Route exact path="/" component={TaskPage}/>
						<Route path="/signin" component={SignIn}/>
						<Route path="/signup" component={SignUp}/>
					</div>
                </Router>
            </Provider>
        );
    }
}

export default App;