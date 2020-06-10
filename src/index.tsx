// import '@babel/polyfill';
import React from 'react';
import dva from 'dva';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import App from './app';
import model1 from './model/count';
import model2 from './model/list';
import './assets/init/normalize.css';
import './assets/less/index.less';
import createHistory from 'history/createBrowserHistory';
import { AppContainer, setConfig } from 'react-hot-loader';
setConfig({
    ignoreSFC: true,
    //@ts-ignore
    ignoreClases: false,
    // optional
    disableHotRenderer: true,
    reloadHooks: false,
});
const app = dva({
    history: createHistory(),
});
app.model(model1);
app.model(model2);

function renderWithHotReload(C: any) {
    app.router((obj: any) => (
        <ConfigProvider locale={zhCN}>
            <C
                history={obj.history}
                match={obj.match}
                location={obj.location}
                getState={obj.app._store.getState}
                dispatch={obj.app._store.dispatch}
            />
        </ConfigProvider>
    ));
    app.start('#root');
}
renderWithHotReload(App);
//@ts-ignore
if (module.hot) {
    //@ts-ignore
    module.hot.accept(() => {
        renderWithHotReload(App);
    });
}
