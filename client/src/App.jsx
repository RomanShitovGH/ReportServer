import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import QueryPage from './pages/QueryPage.jsx';
import IndexPage from "./pages/IndexPage.jsx";

import { createBrowserHistory } from "history";
const history = createBrowserHistory();

export default class App extends React.Component{
    render() {
        return  <Router history = { history }>
                    <Switch>
                        <Route exact path="/" component={ IndexPage } />
                        <Route exact path="/query" component={ QueryPage } />
                        {/*<Route exact path="/products/:product" component={ ProductPage } />

                        <ProtectedRoute exact path="/panel" component={ PanelPage } />
                        <ProtectedRoute exact path="/panel/products" component={ PanelProductsPage } />
                        <ProtectedRoute exact path="/panel/products/:id" component={ PanelProductPage } />

                        <Route exact path="/panel/login" component={ PanelLogin } />
                        <Route component={ NotFound } />*/}
                    </Switch>
                </Router>
    }
}
