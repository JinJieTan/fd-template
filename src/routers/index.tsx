import React from 'react';
import { Route, Switch, Router } from 'dva/router';
import Home from '../routers/home';
import Init from '../routers/login';
import { RouteComponentProps } from 'dva/router';
import { SubscriptionAPI } from 'dva';
interface Props extends RouteComponentProps {}
const App = (props: Props & SubscriptionAPI) => {
    return (
        <Router history={props.history}>
            <Switch>
                <Route
                    path="/init"
                    render={() => {
                        return <Init Name="fade_in" changeShowContent={() => {}} history={props.history} />;
                    }}
                ></Route>
                <Route
                    path="/home"
                    render={() => {
                        return <Home history={props.history} />;
                    }}
                ></Route>
                <Route
                    path="/"
                    render={() => {
                        return <Init Name="fade_in" changeShowContent={() => {}} history={props.history} />;
                    }}
                ></Route>
            </Switch>
        </Router>
    );
};
export default App;
