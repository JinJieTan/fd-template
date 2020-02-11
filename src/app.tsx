import React from 'react';
import { Route, Switch, Router } from 'dva/router';
import Home from './routers/home';
import Init from './routers/login';

interface Props {
    history?: any;
    getState?: any;
    dispatch?: any;
}
export default class App extends React.PureComponent<Props> {
    render() {
        return (
            <div>
                <Router history={this.props.history}>
                    <Switch>
                        <Route
                            path="/init"
                            render={() => {
                                return (
                                    <Init Name="fade_in" changeShowContent={() => {}} history={this.props.history} />
                                );
                            }}
                        ></Route>
                        <Route
                            path="/home"
                            render={() => {
                                return <Home history={this.props.history} />;
                            }}
                        ></Route>
                        <Route
                            path="/"
                            render={() => {
                                return (
                                    <Init Name="fade_in" changeShowContent={() => {}} history={this.props.history} />
                                );
                            }}
                        ></Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}
