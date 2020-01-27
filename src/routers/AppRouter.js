import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import AddWordPage from '../components/AddWordPage';
import DashboardPage from '../components/DashboardPage';
import EditWordPage from '../components/EditWordPage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import WordCatalogPage from '../components/WordCatalogPage';
import StudyPage from '../components/StudyPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>        
                <PublicRoute path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/dashboard" component={DashboardPage} />
                <PrivateRoute path="/catalog" component={WordCatalogPage} />
                <PrivateRoute path="/create" component={AddWordPage} />
                <PrivateRoute path="/edit/:id" component={EditWordPage} />
                <PrivateRoute path="/help" component={HelpPage} />
                <PrivateRoute path="/study" component={StudyPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;