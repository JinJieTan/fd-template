import React from 'react';
import { BrowserRouter } from 'dva/router';
import App from './app';
import dva from 'dva';
import model1 from './model/count';
import model2 from './model/list';
import './assets/init/normalize.css';
import { AppContainer, setConfig } from 'react-hot-loader';
setConfig({
    ignoreSFC: true,
    //@ts-ignore
    ignoreClases: true,
    // optional
    disableHotRenderer: true,
});
const app = dva();
app.model(model1);
app.model(model2);
const render = (Component: any) => {
    app.router((obj: any) => (
        <BrowserRouter>
            <AppContainer>
                <Component
                    history={obj.history}
                    getState={obj.app._store.getState}
                    dispatch={obj.app._store.dispatch}
                />
            </AppContainer>
        </BrowserRouter>
    ));
    app.start('#root');
};
render(App);

//@ts-ignore
if (module.hot) {
    //@ts-ignore
    module.hot.accept('./app.tsx', () => {
        //因为在App里使用的是export default语法，这里使用的是require,默认不会加载default的，所以需要手动加上
        const NextApp = require('./app.tsx').default;
        // 重新渲染到 document 里面
        render(NextApp);
    });
}
