import React from 'react';
import { hot } from 'react-hot-loader';
import { RouteComponentProps } from 'dva/router';
import { SubscriptionAPI } from 'dva';
import T from './routers';
interface Props extends RouteComponentProps {}
const App = (props: Props & SubscriptionAPI) => {
    return <T {...props} />;
};
export default hot(module)(App);
