import React from 'react';
import AddWordPage from '../components/AddWordPage';
import DashboardPage from '../components/DashboardPage';
import EditWordPage from '../components/EditWordPage';
import Header from '../components/Header';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
            <Route path="/" component={DashboardPage} exact={true} />
            <Route path="/create" component={AddWordPage} />
            <Route path="/edit/:id" component={EditWordPage} />
            <Route path="/help" component={HelpPage} />
            <Route component={NotFoundPage} />
        </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;