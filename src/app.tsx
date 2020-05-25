import React from 'react';
import { Route, Switch, Router } from 'dva/router';
import Home from './routers/home';
import Init from './routers/login';
import { hot } from 'react-hot-loader/root';
import { RouteComponentProps } from 'dva/router';
import { SubscriptionAPI } from 'dva';
interface Props extends RouteComponentProps {}
class App extends React.PureComponent<Props & SubscriptionAPI> {
    public render() {
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
export default hot(App);
