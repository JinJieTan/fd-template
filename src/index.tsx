import React from 'react';
import { BrowserRouter } from 'dva/router';
import App from './app';
import dva from 'dva';
import model1 from './model/count';
import model2 from './model/list';
import './assets/init/normalize.css';
const app = dva();
app.model(model1);
app.model(model2);
app.router((obj: any) => (
    <BrowserRouter>
        <App history={obj.history} getState={obj.app._store.getState} dispatch={obj.app._store.dispatch} />
    </BrowserRouter>
));
app.start('#root');
