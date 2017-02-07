import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
/**
 * reudx 1.0后，与组件相关的代码被迁移到react-redux
 * Provider 是一个redux提供的组件，用来接收store
 */
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { useRouterHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import makeRoutes from './routes';
/**
 * 配置仓储
 */
import configureStore from './redux/configureStore';

injectTapEventPlugin();

const browserHistory = useRouterHistory(createBrowserHistory)({
    basename: __BASENAME__
});

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: (state) => state.router
});
/*根组件*/
const rootElement = document.getElementById('root');
const routes = makeRoutes(store);
/**
 * 入口文件,Provider接收一个props为store
 * Provider的children必须为一个function
 * 因为Provider内部会执行this.props.children()
 */
ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router history={history} routes={routes} />
        </div>
    </Provider>,
    rootElement
)
